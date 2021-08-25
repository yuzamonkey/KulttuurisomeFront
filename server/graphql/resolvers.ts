import { AuthenticationError, IResolvers, UserInputError, PubSub } from "apollo-server"
//import { IConversation } from "../types/types"

require('dotenv')
const bcrypt = require('bcrypt')

const SkillCategory = require('../models/skillCategory')
const GroupCategory = require('../models/groupCategory')
const JobAd = require('../models/jobAd')
const Conversation = require('../models/conversation')
const User = require('../models/user')
const UserProfile = require('../models/userProfile')
const Group = require('../models/group')
const GroupProfile = require('../models/groupProfile')
const NotificationModel = require('../models/notification')

const jwt = require('jsonwebtoken')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const JWT_SECRET = process.env.JWT_SECRET

const pubsub = new PubSub()

const resolvers: IResolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date scalar (Jusa has done this)",
    parseValue(value: Date) {
      return new Date(value) //value from the client
    },
    serialize(value: Date) {
      return value //value sent to client
    },
    parseLiteral(ast: any) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value) //ast value is always in string format
      }
      return null
    }
  }),
  Query: {
    me: async (_root, _args, context) => {
      //return context.currentUser
      const result = await User.findOne({ _id: context.currentUser._id })
        .populate('jobQueries notifications')
        .populate({
          path: 'profile',
          populate: {
            path: 'skills',
            populate: {
              path: 'parent children'
            }
          }
        })
        .populate({
          path: 'groups',
          populate: {
            path: 'profile'
          }
        })
        .populate({
          path: 'conversations',
          populate: {
            path: 'participants.object',
            populate: {
              path: 'profile'
            }
          }
        })
      return result
    },
    allUsers: () => {
      return User.find({})
        .populate('jobQueries conversations profile notifications')
        .populate({
          path: 'profile',
          populate: {
            path: 'skills',
            populate: {
              path: 'parent children'
            }
          }
        })
        .populate({
          path: 'groups',
          populate: {
            path: 'profile'
          }
        })
    },
    findUser: (_root, args) => {
      return User.findOne({ _id: args.id })
        .populate('jobQueries conversations profile notifications')
        .populate({
          path: 'profile',
          populate: {
            path: 'skills',
            populate: {
              path: 'parent children'
            }
          }
        })
        .populate({
          path: 'groups',
          populate: {
            path: 'profile'
          }
        })
    },
    allUserProfiles: (_root) => {
      return UserProfile.find({}).populate('user skills')
    },
    allUsersAndGroups: async (_root) => {
      const users = await User.find({}).populate({
        path: 'profile',
        populate: {
          path: 'skills',
          populate: {
            path: 'parent children'
          }
        }
      })
      const groups = await Group.find({})
        .populate('users')
        .populate({
          path: 'profile', populate: {
            path: 'groupTypes',
            populate: {
              path: 'parent children'
            }
          }
        })
        .populate({
          path: 'conversations',
          populate: {
            path: 'participants.object',
            populate: {
              path: 'profile'
            }
          }
        })
      return users.concat(groups)
    },
    findUserOrGroup: async (_root, args) => {
      const user = await User.findOne({ _id: args.id })
        .populate('jobQueries profile notifications')
        .populate({
          path: 'profile',
          populate: {
            path: 'skills',
            populate: {
              path: 'parent children'
            }
          }
        })
        .populate({
          path: 'groups',
          populate: {
            path: 'profile'
          }
        })
        .populate({
          path: 'conversations',
          populate: {
            path: 'participants.object',
            populate: {
              path: 'profile'
            }
          }
        })
      const group = await Group.findOne({ _id: args.id })
        .populate('jobQueries users notifications')
        .populate({
          path: 'profile', populate: {
            path: 'groupTypes'
          }
        })
        .populate({
          path: 'conversations',
          populate: {
            path: 'participants.object',
            populate: {
              path: 'profile'
            }
          }
        })
      return user || group
    },
    allGroups: () => {
      return Group.find({})
        .populate('users')
        .populate({
          path: 'profile', populate: {
            path: 'groupTypes'
          }
        })

    },
    findGroup: (_root, args) => {
      return Group.findOne({ _id: args.id })
        .populate('users')
        .populate({
          path: 'profile', populate: {
            path: 'groupTypes'
          }
        })
    },
    allConversations: () => {
      return Conversation.find({})
        .populate({
          path: 'participants.object',
          populate: {
            path: 'profile'
          }
        })
    },
    findConversation: async (_root, args) => {
      return await Conversation.findOne({ _id: args.id })
        .populate({
          path: 'participants.object',
          populate: {
            path: 'profile'
          }
        })
        .populate({
          path: 'messages.sender.object',
          populate: {
            path: 'profile'
          }
        })
    },
    allJobAds: async () => {
      return JobAd.find({})
        .populate({
          path: 'postedBy.object',
          populate: {
            path: 'profile'
          }
        })
        .populate({
          path: 'wantedCategories.object',
          populate: {
            path: 'parent children'
          }
        })
    },
    findJobAd: async (_root, args) => {
      return await JobAd.findOne({ _id: args.id })
        .populate({
          path: 'postedBy.object',
          populate: {
            path: 'profile'
          }
        })
        .populate({
          path: 'wantedCategories.object',
          populate: {
            path: 'parent children'
          }
        })
    },
    allSkillCategories: async () => {
      return SkillCategory.find({}).populate('parent children')
    },
    allGroupSkillCategories: async () => {
      return GroupCategory.find({}).populate('parent children')
    },
    allNotifications: async () => {
      const notifications = await NotificationModel.find({})
      const sorted = notifications.sort((n1: any, n2: any) => {
        const n1date = new Date(n1.date).getTime()
        const n2date = new Date(n2.date).getTime()
        return n2date - n1date
      })
      return sorted
    }
  },
  UserOrGroup: {
    async __resolveType(obj: { kind: string; }, _context: any, _info: any) {
      if (obj.kind === 'User') return 'User'
      if (obj.kind === 'Group') return 'Group'
      else {
        const id = obj
        const result = await User.findOne({ _id: id }) || await Group.findOne({ _id: id })
        return result.kind
      }
    }
  },
  SkillCategoryOrGroupCategory: {
    async __resolveType(obj: any) {
      if (obj.kind === 'GroupCategory') return 'GroupCategory'
      if (obj.kind === 'SkillCategory') return 'SkillCategory'
      else {
        const id = obj
        const result = await SkillCategory.findOne({ _id: id }) || await GroupCategory.findOne({ _id: id })
        return result.kind
      }
    }
  },
  NotificationRelatedObject: {
    async __resolveType(obj: any) {
      if (obj.kind === 'JobAd') return 'JobAd'
      else {
        return null
      }
    }
  },
  Mutation: {
    addSkillCategory: async (_root, args) => {
      const name = args.name
      const profession = args.profession
      const parentName = args.parent

      try {
        const parent = await SkillCategory.findOne({ name: parentName })
        const newSkillCategory = new SkillCategory({
          name: name,
          profession: profession,
          parent: parent?._id,
          children: []
        })
        const savedSkillCategory = await newSkillCategory.save()
        if (parent) {
          parent.children = parent.children.concat(savedSkillCategory._id)
          await parent.save()
        }
        return savedSkillCategory
      } catch (error) {
        console.log("ERROR ON ADD SKILLCATEGORY", error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    addGroupCategory: async (_root, args) => {
      const name = args.name
      const parentName = args.parent
      try {
        const parent = await GroupCategory.findOne({ name: parentName })
        const newGroupCategory = new GroupCategory({
          name: name,
          parent: parent?._id,
          children: []
        })
        const savedGroupCategory = await newGroupCategory.save()
        if (parent) {
          parent.children = parent.children.concat(savedGroupCategory._id)
          await parent.save()
        }
        return savedGroupCategory
      } catch (error) {
        console.log("ERROR ON ADD GROUP CATEGORY", error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },
    createUser: async (_root, args) => {
      const username = args.username
      const firstName = args.firstName
      const lastName = args.lastName

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      try {
        const userProfile = new UserProfile({
          firstName: firstName,
          lastName: lastName,
          name: `${firstName} ${lastName}`
        })
        const savedProfile = await userProfile.save()
        const user = new User({
          username: username,
          passwordHash: passwordHash,
          profile: savedProfile
        })
        const savedUser = await user.save()
        savedProfile.user = savedUser
        await savedProfile.save()
        return savedUser
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || await bcrypt.compare(args.password, user.passwordHash) === false) {
        console.log("WRONG CREDENTIALS")
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET), id: user._id }
    },
    createJobAd: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const content = args.content
      const postedBy = args.postedBy
      const startSchedule = args.startSchedule
      const endSchedule = args.endSchedule
      const wantedCategories = args.wantedCategories
      const location = args.location
      const salary = args.salary

      let wantedCategoryObjects = []

      for (let categoryId of wantedCategories) {
        const obj = await SkillCategory.findOne({ _id: categoryId }) || await GroupCategory.findOne({ _id: categoryId })
        if (!obj) {
          console.log("ERROR on new JobAd. No category with id", categoryId)
          throw new UserInputError("No category with id", categoryId)
        }
        wantedCategoryObjects.push({ _id: categoryId, kind: obj.kind, object: obj })
      }

      const postedByObject = await User.findOne({ _id: postedBy }) || await Group.findOne({ _id: postedBy })
      if (!postedByObject) {
        console.log("ERROR ON new JobAd. No user or group with id", postedBy)
        throw new UserInputError("No category with id", postedBy)
      }

      const newJobAd = new JobAd({
        content: content,
        postedBy: { _id: postedBy, kind: postedByObject.kind, object: postedByObject },
        startSchedule: startSchedule,
        endSchedule: endSchedule,
        wantedCategories: wantedCategoryObjects,
        location: location,
        salary: salary
      })

      try {
        const savedJobAd = await newJobAd.save()
        postedByObject.jobQueries = postedByObject.jobQueries.concat(newJobAd)
        await postedByObject.save()
        //for now, to test, post notification to all users
        const newNotification = new NotificationModel({
          content: "New jobad for you: " + content,
          link: `/jobmarket/jobads/${savedJobAd._id}`,
          relatedObject: {
            kind: 'JobAd',
            object: savedJobAd
          }
        })
        newNotification.save()
        //manage who will get the notification
        const notificationReceiverIds: string[] = []
        for (let category of wantedCategoryObjects) {
          if (category.kind === 'SkillCategory') {
            for (let userId of category.object.users) {
              if (!notificationReceiverIds.includes(JSON.stringify(userId))) {
                notificationReceiverIds.push(JSON.stringify(userId))
              }
            }
          }
          else if (category.kind === 'GroupCategory') {
            for (let groupId of category.object.groups) {
              if (!notificationReceiverIds.includes(JSON.stringify(groupId))) {
                notificationReceiverIds.push(JSON.stringify(groupId))
              }
            }
          }
          else {
            console.log("NO CATEGORY FOUND")
            throw new UserInputError('No GroupCategory or SkillCategory found')
          }
        }
        for (let id of notificationReceiverIds) {
          if (JSON.parse(id) !== postedBy) {
            const receiver = await User.findOne({ _id: JSON.parse(id) }) || await Group.findOne({ _id: JSON.parse(id) })
            receiver.notifications = receiver.notifications.concat(newNotification)
            await receiver.save()
          }
        }

        pubsub.publish('NOTIFICATION_ADDED', { notificationAdded: newNotification })
        console.log("JobAd ADDED SUCCESFULLY")
        return savedJobAd
      } catch (error) {
        console.log("CATCHED ERROR ON CREATE JobAd", error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createConversation: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const senderId = args.senderId
      const receiverId = args.receiverId


      const sender = await User.findOne({ _id: senderId }) || await Group.findOne({ _id: senderId })
      const receiver = await User.findOne({ _id: receiverId }) || await Group.findOne({ _id: receiverId })

      console.log("\nSENDER •••", sender._id)
      console.log("RECEIVER •••", receiver._id)

      if (!sender || !receiver) {
        console.log("NO SENDER OR RECEIVER")
        throw new UserInputError('No sender or receiver', {
          invalidArgs: args,
        })
      }

      const newConversation = new Conversation({
        participants: [
          {
            _id: sender.id,
            kind: sender.kind,
            object: sender
          },
          {
            _id: receiver.id,
            kind: receiver.kind,
            object: receiver
          }
        ]
      })

      console.log("•••NEW CONVERSATION•••\n", newConversation)

      try {
        const savedConversation = await newConversation.save()
        console.log("SAVED CONVERSATION SUCCESS, ", savedConversation)
        sender.conversations = sender.conversations.concat(newConversation)
        await sender.save()
        receiver.conversations = receiver.conversations.concat(newConversation)
        await receiver.save()
        return savedConversation
      } catch (error) {
        console.log("CREATE CONVERSATION ERROR", error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    sendMessage: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const senderId = args.senderId
      const conversationId = args.conversationId
      const body = args.body

      const sender = await User.findOne({ _id: senderId }) || await Group.findOne({ _id: senderId })
      const conversation = await Conversation.findOne({ _id: conversationId })

      if (!sender) {
        throw new UserInputError('No sender found', {
          invalidArgs: args
        })
      }

      if (!conversation) {
        throw new UserInputError('No conversation found', {
          invalidArgs: args
        })
      }

      const newMessage = {
        body: body,
        sender: {
          kind: sender.kind,
          object: sender
        }
      }

      try {
        conversation.messages = conversation.messages.concat(newMessage)
        const messageWithId = conversation.messages[conversation.messages.length - 1]
        await conversation.save()
        pubsub.publish('MESSAGE_ADDED', { messageAdded: messageWithId })
        return messageWithId
      } catch (error) {
        throw new TypeError(error.message)
      }
    },
    createGroup: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const groupName = args.name
      console.log("•••NAME", groupName)
      const userIds = args.users
      //validate that current user is included in userIds
      console.log("•••IDS", userIds)
      const about = args.about
      const image = args.image
      const skills = args.skills

      try {
        //create group
        const newGroup = new Group({
          users: userIds
        })
        const savedGroup = await newGroup.save()

        //create groupProfile
        const newGroupProfile = new GroupProfile({
          name: groupName,
          group: savedGroup,
          about: about,
          image: image,
          groupTypes: skills
        })
        const savedGroupProfile = await newGroupProfile.save()
        savedGroup.profile = savedGroupProfile
        await savedGroup.save()

        //concat group to each group member
        await userIds.forEach(async (id: String) => {
          const user = await User.findOne({ _id: id })
          user.groups = user.groups.concat(savedGroup)
          await user.save()
        });
        for (let skill of skills) {
          const skillObject = await GroupCategory.findOne({ _id: skill })
          skillObject.groups = skillObject.groups.concat(savedGroup)
          skillObject.save()
        }
        //notifications
        const newNotification = new NotificationModel({
          content: "You have been added to a new group " + groupName,
          link: `/profiles/${savedGroup._id}`,
          relatedObject: {
            kind: 'Group',
            object: savedGroup
          }
        })
        await newNotification.save()
        for (let id of userIds) {
          if (id !== currentUser.id) {
            const user = await User.findOne({ _id: id })
            if (user) {
              user.notifications = user.notifications.concat(newNotification)
              await user.save()
            }
          }
        }
        pubsub.publish('NOTIFICATION_ADDED', { notificationAdded: newNotification })
        return savedGroup
      } catch (error) {
        console.log("ERROR ON CREATE GROUP", error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUserProfile: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const myId = currentUser.id
      const skills = args.skills
      const about = args.about
      const image = args.image

      try {
        const userProfile = await UserProfile.findOne({ user: myId })
        userProfile.about = about
        userProfile.skills = skills
        userProfile.image = image
        userProfile.isEditedByUser = true
        const savedUserProfile = await userProfile.save()
        for (let skill of skills) {
          const skillObject = await SkillCategory.findOne({ _id: skill })
          skillObject.users = skillObject.users.concat(myId)
          skillObject.save()
        }
        return savedUserProfile
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editUserProfile: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const about = args.about
      console.log("ABOUT", about)
      try {
        if (currentUser.profile) {
          const profile = await UserProfile.findOne({ _id: currentUser.profile })
          console.log("FOUND PROFILE", profile)
          profile.about = about
          const savedProfile = await profile.save()
          return savedProfile
        } else {
          console.log("CREATE NEW PROFILE")
          const newProfile = new UserProfile({
            user: currentUser,
            about: about
          })
          const savedProfile = await newProfile.save()
          currentUser.profile = savedProfile
          await currentUser.save()
          return savedProfile
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
    },
    notificationAdded: {
      subscribe: () => pubsub.asyncIterator(['NOTIFICATION_ADDED'])
    },
  }
}

module.exports = resolvers