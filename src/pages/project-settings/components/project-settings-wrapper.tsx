import React, { useEffect } from 'react';
import DefSwitch from '../../../features/switch/switch';
import DefaultInputs from '../../../features/defultinputs/Defultinputs';
import './project-settings-wrapper.css';
import { useState } from 'react';
import { RandomKey } from '../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { changeRate } from '../../../redux/project-settings';

function ProjectSettingsWrapper({ index, title, item }: IProjectSettingsWrapper) {
  const dispatch = useDispatch();

  const [todos, setTodo] = useState<any>([]);
  const [input, setInput] = useState('');

  const addTodo: any = (title: any) => {
    const newTodo = {
      id: Math.random(),
      title,
      done: false
    };
    setTodo((oldArr: []) => [...oldArr, newTodo]);
  };

  useEffect(() => {
    setTodo([]);
    item?.blacklistKeywords?.forEach((key: string) => {
      addTodo(key);
    });
  }, [item]);

  const removeTodo: any = (id: number) => {
    const newTodo = todos.filter((to: any) => to.id != id);
    setTodo(newTodo);
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (input) {
      addTodo(input);
      dispatch(
        changeRate({
          keyNumber: index + 1,
          rate: {
            autoReply: true,
            blacklistKeywords: todos.map((text: any) => text.title).push(input),
            reviewStyle: 'friendly'
          }
        })
      );
      setInput('');
    }
  };

  return (
    <div className="wrapper">
      <div className="d-flex justify-content-end mb-5">
        <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
          {title}
          <DefSwitch className="ms-2" status={item.autoReply} />
        </div>
      </div>
      <form onSubmit={submit}>
        <DefaultInputs
          placeholder="Введите ключевое слово и нажмите Enter"
          title={<span className="c-grey fs-18 mb-2 d-block">Черный список</span>}
          quotation={{
            text: 'text',
            title: 'title'
          }}
          onChange={(e: any) => setInput(e.target.value)}
          inpProps={{
            value: input
          }}
        />
      </form>
      <div className="todos">
        {todos.map((todo: any) => (
          <div className="todo" key={RandomKey()}>
            <span className="fs-16 c-grey">{todo.title}</span>
            <i className="fa-regular fa-circle-xmark ms-3" onClick={() => removeTodo(todo.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectSettingsWrapper;
