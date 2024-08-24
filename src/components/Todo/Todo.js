import {Row, Tag, Checkbox} from 'antd'
import { useState } from 'react';
import { useMyContext } from '../context/DataContext';

const priority = [
  "High",
  "Medium",
  "Low"
]
function ToDo ({name, priority, completed, id}) 
{
  const {contextData, handleUpdateItem}= useMyContext();
  const [isChecked, setIsChecked] =useState(completed);
  
  const checkStylePriority = (priority) => 
  {
    if(priority=="High")
    {
      return 'red';
    }else if(priority=='Medium')
    {
      return 'blue';
    }else {
      return 'black';

    }
  }

 

  const lineThrough = {
    marginBottom: 3,
    textDecoration: isChecked ? 'line-through' : '',
    opacity: isChecked ? '0.5': ''
  }

  const handleChecked = () => {
    setIsChecked(!isChecked);
    //uncheck when check set completed == true
    //check when check set completed == false
   let obj = {
    id: id,
    name: name,
    priority: priority,
    completed: !isChecked
   }

   handleUpdateItem(id, !isChecked);

  }

    return (
        <Row
        justify='space-between'
        style={lineThrough}
      >
        <Checkbox onChange={handleChecked} checked={isChecked}  >
        {name}
        </Checkbox>
        <Tag style={{ margin: 0 }}  color={checkStylePriority(priority)}>
          {priority}
        </Tag>
        
      
      </Row>

    );
}

export default ToDo;