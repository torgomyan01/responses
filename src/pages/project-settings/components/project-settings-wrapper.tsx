import React, { useEffect } from 'react';
import DefSwitch from '../../../features/switch/switch';
import DefaultInputs from '../../../features/defultinputs/Defultinputs';
import './project-settings-wrapper.scss';
import { useState } from 'react';
import { RandomKey } from '../../../utils/helpers';

function ProjectSettingsWrapper({
  index,
  title,
  item,
  onChange,
  changeAutoReply,
  removeTalentItem
}: IProjectSettingsWrapper) {
  const [todos, setTodo] = useState<any>([]);
  const [input, setInput] = useState('');

  const addTodo: any = (title: any) => {
    const newTodo = {
      id: Math.random(),
      title
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
    removeTalentItem(todos.find((to: any) => to.id === id).title, index + 1);
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (input) {
      addTodo(input);
      onChange(input, index + 1);
      setInput('');
    }
  };

  function changeAutoR(val: boolean) {
    changeAutoReply(val, index + 1);
  }

  return (
    <div className="wrapper">
      <div className="d-flex justify-content-end mb-5">
        <div className="fs-18 c-grey d-flex justify-content-start align-items-center">
          {title}
          <DefSwitch className="ms-2" status={item.autoReply} onChangeProps={changeAutoR} />
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
