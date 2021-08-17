import { useMutation } from "@apollo/client"
import { useContext, useState } from "react"
import { CREATE_JOBQUERY } from "../../../../../../graphql/mutations"
import { categoriesWithParentsRemoved } from "../../../../../../utils/utilityFunctions"
import { UserContext } from "../../../../../UtilityComponents/UserContext"
import { Button, Loading } from "../../../../../UtilityComponents/UtilityComponents"


const Summary = ({ wantedCategories, content, location, salary, startSchedule, endSchedule, }) => {

  const [submitCompleted, setSubmitCompleted] = useState(false)
  const [redirectAdress, setRedirectAdress] = useState('')

  const userContext = useContext(UserContext)

  const [createQuery, { loading }] = useMutation(CREATE_JOBQUERY, {
    onError: (error) => {
      console.log("Error at create query mutation: \n", error)
    }
  })

  const submit = async () => {
    const postedBy = userContext.sessionId
    const parentsRemoved = categoriesWithParentsRemoved(wantedCategories)
    const categoryIds = parentsRemoved.map(c => c.id)

    const response = await createQuery({
      variables: {
        content: content,
        startSchedule: startSchedule,
        endSchedule: endSchedule,
        wantedCategories: categoryIds,
        postedBy: postedBy,
        salary: salary,
        location: location
      }
    })
    if (response.data?.createJobquery.content === content) {
      setSubmitCompleted(true)
      setRedirectAdress(`/jobmarket/queries/${response.data.createJobquery.id}`)
    } else {
      console.log("The name might be taken")
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    !submitCompleted
      ?
      <div>
        <h1>Summary</h1>
        {categoriesWithParentsRemoved(wantedCategories).map(category => <div key={category.id}>{category.name}</div>)}
        <p>content: {content}</p>
        <p>location: {location}</p>
        <p>salary: {salary}</p>
        <p>startSchedule: {startSchedule}</p>
        <p>endSchedule: {endSchedule}</p>
        <Button text="Submit" handleClick={submit} />
      </div>
      :
      <div>
        <h1>Jobpost added</h1>
        <p>See it <a href={redirectAdress}>here</a></p>
      </div>
  )
}

export default Summary