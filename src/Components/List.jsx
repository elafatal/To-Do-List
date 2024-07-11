import React from "react";
import './List.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

const List = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState (false);
    const [completedTodos, setCompletedTodos] = useState ([]);
    const [allTodos, setTodos] = useState ([]);
    const [newTitle, setNewTitle] = useState ('');
    const [newDescription, setNewDescription] = useState ('');

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      
    const handleComplete = index => {
        let now = new Date ();
        let h = now.getHours ();
        let m = now.getMinutes ();
        let s = now.getSeconds ();
        let completedOn =formatDate(now) + ' at ' + h + ':' + m + ':' + s;
        console.log(completedOn);
        let filteredItem = {
          ...allTodos[index],
          completedOn: completedOn 
        };
    
        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push (filteredItem);
        setCompletedTodos (updatedCompletedArr);
        handleDeleteTodo (index);
        localStorage.setItem (
          'completedTodos',
          JSON.stringify (updatedCompletedArr)
        );
      }; 

    const handleAddTodo = () => {
        let newTodoItem = {
          title: newTitle,
          description: newDescription,
        };
        setNewTitle("")
        setNewDescription("")
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push (newTodoItem);
        setTodos (updatedTodoArr);
        localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
      };
      
    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice (index,1);

        localStorage.setItem ('todolist', JSON.stringify (reducedTodo));
        setTodos (reducedTodo);
        };

    const handleDeleteCompletedTodo = index => {
        let reducedTodo = [...completedTodos];
        reducedTodo.splice (index,1);
        
        localStorage.setItem ('completedTodos', JSON.stringify (reducedTodo));
        setCompletedTodos (reducedTodo);
    };
    useEffect (() => {
        let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
        let savedCompletedTodo = JSON.parse (
          localStorage.getItem ('completedTodos')
        );
        if (savedTodo) {
          setTodos (savedTodo);
        }
    
        if (savedCompletedTodo) {
          setCompletedTodos (savedCompletedTodo);
        }
      }, []);
    
    return (
     <>
       <h1>Get Things Done !</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle (e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
            {isCompleteScreen === false ? allTodos.map((item,index)=>{
                return(
                      <div className="todo-list-item" key={index}>
                        <div>
                            <h3> {item.title}</h3>
                            <p>{item.description}</p> 
                        </div>
                        <div>
 
                        <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo (index)}
                        title="Delete?"
                      />
                        <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete (index)}
                        title="Complete?"
                      />
                        {/* <AiOutlineEdit  className="check-icon"
                        onClick={() => handleEdit (index,item)}
                        title="Edit?" /> */}
                        </div>
                       
                      </div> 
                )
            }): (completedTodos.map ((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p><small>Completed on: {item.completedOn}</small></p>
                    </div>
  
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteCompletedTodo (index)}
                        title="Delete?"
                      />
                    </div>
  
                  </div>
                );
              }))}
        </div>
        </div>
     </>
    );
    
};

export default List;
