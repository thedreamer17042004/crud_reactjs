import {Row, Col, Typography, Radio, Select, Tag} from 'antd'
import _ from 'lodash';
import Search from 'antd/lib/input/Search';
import { SearchOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { useContext, useEffect, useState } from 'react';
import { useMyContext } from '../context/DataContext';


function Filter() {
    //search tìm theo tên trong mảng data và in nó ra
    const {contextData, updateContextData, resetFilteredData} = useMyContext();

    const [searchValue, setSearchValue] = useState('');
    const [filterPriorities, setFilterPriorities] = useState([])
    const [filterStatus, setFilterStatus] = useState('All');


 
    const handlSearch = (event) => {
        event.preventDefault();
        
        const updateValue = event.target.value;
        setSearchValue(updateValue);

        if(searchValue!=null)
        {

           
            const dataa = contextData.filter((todo)=>{
                if(filterStatus=="All")
                {
                    if(filterPriorities.length>0)
                    {
                       
                        return todo.name.toLowerCase().includes(updateValue.toLowerCase().trim())&&filterPriorities.includes(todo.priority);
                    }
                    else {
                        return todo.name.toLowerCase().includes(updateValue.toLowerCase().trim())
                    }
                }else if(filterStatus=="Completed")
                {
                    if(filterPriorities.length>0)
                    {
                       
                        return todo.name.toLowerCase().includes(updateValue.toLowerCase().trim())&&filterPriorities.includes(todo.priority)&&todo.completed===true;
                    }
                    else {
                        return todo.name.toLowerCase().includes(updateValue.toLowerCase().trim())&&todo.completed==true;
                    }
                }
              else if(filterStatus=="Todo")
              {
                if(filterPriorities.length>0)
                    {
                       
                        return todo.name.toLowerCase().includes(updateValue.toLowerCase().trim())&&filterPriorities.includes(todo.priority)&&todo.completed===false;
                    }
                    else {
                        return todo.name.toLowerCase().includes(updateValue.toLowerCase().trim())&&todo.completed==false;
                    }
              }
            })
            updateContextData(dataa)
        }
    }

   const handleMutipleSelect = (selectedValues) => {
        setFilterPriorities(selectedValues);
        const arr = [];
        contextData.forEach(element => {
             if(filterStatus=="Completed"){


                    if(searchValue.length>0)
                {
                    if(selectedValues.includes(element.priority)&&element.name.toLowerCase().includes(searchValue.toLowerCase().trim())&&element.completed==true)
                    {
                    arr.push(element);
                    }
                }else {

                    if(selectedValues.includes(element.priority)&&element.completed==true)
                    {
                    arr.push(element);
                    }
                }
            }else if(filterStatus=="Todo")
            {
                if(searchValue.length>0)
                {
                    if(selectedValues.includes(element.priority)&&element.name.toLowerCase().includes(searchValue.toLowerCase().trim())&&element.completed==false)
                    {
                    arr.push(element);
                    }
                }else {

                    if(selectedValues.includes(element.priority)&&element.completed==false)
                    {
                    arr.push(element);
                    }
                }
            }else {
                if(searchValue.length>0)
                {
                    if(selectedValues.includes(element.priority)&&element.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
                    {
                    arr.push(element);
                    }
                }else {

                    if(selectedValues.includes(element.priority))
                    {
                    arr.push(element);
                    }
                }
            }
           
        });

       updateContextData(arr);
   }


   const handleStatus = (e) => {
    const statusValue =  e.target.value;
    setFilterStatus(statusValue);
    
    const dataa = contextData.filter((todo)=>{
        if(statusValue=="All")
        {
            console.log("All")
            if(searchValue.length>0&&filterPriorities.length>0)
            {
                return todo.name.toLowerCase().includes(searchValue.toLowerCase().trim())&&filterPriorities.includes(todo.priority);
            }else if(searchValue.length>0)
            {
                return todo.name.toLowerCase().includes(searchValue.toLowerCase().trim());
            }else if(filterPriorities.length>0){
                return filterPriorities.includes(todo.priority);

            }else {
                return todo;
            }
        }else if(statusValue=='Completed')
        {
            if(searchValue.length>0&&filterPriorities.length>0)
            {
                return todo.name.toLowerCase().includes(searchValue.toLowerCase().trim())&&filterPriorities.includes(todo.priority)&&todo.completed==true;
            }else if(searchValue.length>0)
            {
                return todo.name.toLowerCase().includes(searchValue.toLowerCase().trim())&&todo.completed==true;
            }else if(filterPriorities.length>0){
                return filterPriorities.includes(todo.priority)&&todo.completed==true;

            }else {
                return todo.completed==true;
            }
        }else if(statusValue=='Todo')
        {
            if(searchValue.length>0&&filterPriorities.length>0)
            {
                return todo.name.toLowerCase().includes(searchValue.toLowerCase().trim())&&filterPriorities.includes(todo.priority)&&todo.completed==false;
            }else if(searchValue.length>0)
            {
                return todo.name.toLowerCase().includes(searchValue.toLowerCase().trim())&&todo.completed==false;
            }else if(filterPriorities.length>0){
                return filterPriorities.includes(todo.priority)&&todo.completed==false;

            }else {
                return todo.completed==false;
            }
        }
     
      })
    
      updateContextData(dataa)
  }

    return (
       <Row  justify='center'>
        <Col span={24}>
            <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 9 }}>
                Search
            </Typography.Paragraph>
            <Search
                placeholder="Enter your keywords"
                enterButton
                onChange={handlSearch}
                value={searchValue}

            />
        </Col>
        <Col span={24}>
        <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 9 }}>
                Filter by Status
            </Typography.Paragraph>
            <Radio.Group  value={filterStatus} onChange={handleStatus}>
            <Radio value="All" >All</Radio>
            <Radio value="Completed">Completed</Radio>
            <Radio value="Todo">To Do</Radio>
            </Radio.Group>
        </Col>
        <Col span={24}>

            <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 9 }}>
            Filter By Priority
            </Typography.Paragraph>
        
            <Select
                 mode='multiple'
                 style={{width: '100%'}}
                placeholder="Select an option"
                onChange={handleMutipleSelect}
                value={filterPriorities}
                >
                <Select.Option value="High" label="High">

                    <Tag color='red'>High</Tag>
                </Select.Option>
                <Select.Option value="Medium" label='Medium'>
                    <Tag color='blue'>Medium</Tag>
                </Select.Option>
                <Select.Option value="Low" label='Low'>
                    <Tag color='black'>Low</Tag>

                </Select.Option>
            </Select>
        </Col>
       </Row>

    );
    
    
}

export default Filter;