import {Row, Col,Select, Input, Tag, Button} from 'antd'

import ToDo from '../Todo/Todo';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from 'react';
import _ from 'lodash';
import { useMyContext } from '../context/DataContext';
function ToDoList()
{

  const {contextData, updateContextData, filteredData, appendData}= useMyContext();
  const [todoName, setTodoName] = useState('');
  const [priorities, setPriorities]  = useState('Medium');


  const handlePriority = (selectedValue) => {
    setPriorities(selectedValue);
   
  }

  const handleClick = () => {
   
    if(todoName=='')
    {
      alert("Hãy đặt tên todo đi ey");
    }else {
      const arr= _.clone(contextData);
      const idva = arr.length+1;
      let newItem=
      {
        id: idva,
        name: todoName , 
        priority : priorities, 
        completed: false
      
      };

      appendData(newItem);
      setTodoName('');
      alert("Thêm mới thành công");
    }
  }

    return (

    <Row style={{ height: 'calc(100% - 40px)' }}>
        <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
         {
         (filteredData.length>0)?(filteredData.map(todo => <ToDo key={todo.id}  id={todo.id} name={todo.name}  priority={todo.priority} completed={todo.completed} />))
        : ''}
        </Col>
        <Col span={24}>
          <Input.Group style={{ display: 'flex' }}  compact>
            <Input onChange={(e)=>setTodoName(e.target.value)} value={todoName}/>
            <Select value={priorities} onChange={handlePriority}>
              <Select.Option value='High' label='High'>
                <Tag color='red'>High</Tag>
              </Select.Option>
              <Select.Option value='Medium' label='Medium'>
                <Tag color='blue'>Medium</Tag>
              </Select.Option>
              <Select.Option value='Low' label='Low'>
                <Tag color='gray'>Low</Tag>
              </Select.Option>
            </Select>
            <Button type='primary' onClick={handleClick}>
              Add
            </Button>
          </Input.Group>
        </Col>
      </Row>
    );
}

export default ToDoList;
