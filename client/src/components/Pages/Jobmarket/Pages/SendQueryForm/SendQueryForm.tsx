import React, { useState } from 'react';
import { useQuery } from '@apollo/client'
import { ALL_GROUP_SKILL_CATEGORIES, ALL_SKILL_CATEGORIES } from '../../../../../graphql/queries';
import { Button, Loading } from '../../../../UtilityComponents/UtilityComponents';
import JobqueryInfoForm from './Views/JobqueryInfoForm';
import WantedCategoriesSelection from './Views/WantedCategoriesSelection'
import Summary from './Views/Summary'

interface Category {
  id: string,
  name: string
}

const SendQueryForm = () => {

  const [content, setContent] = useState('Details about everything, detailed schedule, locations and addresses, nature of the project...')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [startSchedule, setStartSchedule] = useState('YYYY-MM-DD')
  const [endSchedule, setEndSchedule] = useState('YYYY-MM-DD')

  const [wantedCategories, setWantedCategories] = useState<Category[]>([])
  const [skillCategories, setSkillCategories] = useState<Category[]>([])
  const [groupCategories, setGroupCategories] = useState<Category[]>([])

  const skillCategoriesResult = useQuery(ALL_SKILL_CATEGORIES, { onCompleted: () => setSkillCategories(skillCategoriesResult.data.allSkillCategories) })
  const groupCategoriesResult = useQuery(ALL_GROUP_SKILL_CATEGORIES, { onCompleted: () => setGroupCategories(groupCategoriesResult.data.allGroupSkillCategories) })

  const views = [
    <WantedCategoriesSelection
      skillCategories={skillCategories}
      groupCategories={groupCategories}
      wantedCategories={wantedCategories}
      setWantedCategories={setWantedCategories} />,
    <JobqueryInfoForm
      content={content}
      setContent={setContent}
      location={location}
      setLocation={setLocation}
      salary={salary} 
      setSalary={setSalary} 
      startSchedule={startSchedule} 
      setStartSchedule={setStartSchedule}
      endSchedule={endSchedule} 
      setEndSchedule={setEndSchedule}
      />,
      <Summary 
      wantedCategories={wantedCategories}
      content={content}
      location={location}
      salary={salary} 
      startSchedule={startSchedule} 
      endSchedule={endSchedule} 
      />
  ]
  const [currentView, setCurrentView] = useState(0)
  if (skillCategoriesResult.loading || groupCategoriesResult.loading) {
    return <Loading />
  }



  const handlePrevPress = () => {
    currentView <= (views.length - 1) && currentView > 0 && setCurrentView(currentView - 1)
  }

  const handleNextPress = () => {
    currentView < (views.length - 1) && currentView >= 0 && setCurrentView(currentView + 1)
  }


  return (
    <div>
      <div>
        {views[currentView]}
      </div>
      <div className="profile-edit-switch-view-buttons-container">
        <Button handleClick={handlePrevPress} text="Prev" />
        <Button handleClick={handleNextPress} text="Next" />
      </div>
    </div>
    // <div>
    //   <h2>Send Query</h2>
    //   <div>
    //     <form onSubmit={submit}>
    //       <div>
    //         description <textarea
    //           cols={50}
    //           rows={5}
    //           value={content}
    //           onChange={({ target }) => setContent(target.value)}
    //         />
    //       </div>
    //       <div>
    //         location <input
    //           value={location}
    //           onChange={({ target }) => setLocation(target.value)}
    //         />
    //       </div>
    //       <div>
    //         salary <input
    //           value={salary}
    //           onChange={({ target }) => setSalary(target.value)}
    //         />
    //       </div>
    //       <div>
    //         startSchedule (or Day, Month, Year dropdowns?)<input
    //           value={startSchedule}
    //           onChange={({ target }) => setStartSchedule(target.value)}
    //         />
    //       </div>
    //       <div>
    //         endSchedule <input
    //           value={endSchedule}
    //           onChange={({ target }) => setEndSchedule(target.value)}
    //         />
    //       </div>
    //       <div>
    //         <b>Select categories:</b>
    //         {allCategories.map(category => <div onClick={() => handleCategoryClick(category)}>{category.name}</div>)}
    //       </div>
    //       <div>
    //         <b>Selected categories:</b>
    //         {wantedCategories.map(category => <div>{category.name}</div>)}
    //       </div>
    //       <button type='submit'>Send</button>
    //     </form>
    //   </div>
    // </div>
  )
};

export default SendQueryForm;