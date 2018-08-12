
import React, { Component } from "react";

import TodoLine from './todo/TodoLine';
import TodoCreate from './todo/TodoCreate';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items || []
    }

    this.handleTextClick = this.handleTextClick.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleItemChange(key, index, value) {
    const { items } = this.state;

    switch (key) {
      case 'text':
        this.setState({
          items: [
            ...items.slice(0, index),
            { ...items[index], text: value },
            ...items.slice(index + 1)
          ],
          focusedId: -1
        })
        break;
      case 'checkbox':
        this.setState({
          items: [
            ...items.slice(0, index),
            { ...items[index], checked: value },
            ...items.slice(index + 1)
          ],
          focusedId: -1
        })
        break;
      default:
        console.log('wrong key "${key}"');
    }
  }

  handleCreate(value) {
    this.setState({
      items: [...this.state.items, { text: value, checked: false }]
    });
  }

  handleTextClick(id) {
    this.setState({
      focusedId: id
    })
  }

  render() {
    const { items, focusedId } = this.state;

    return (
      <div className="todo-list">
        {items.map((item, index) => (
          <TodoLine
            key={index}
            item={item}
            focused={index === focusedId}
            onTextClick={() => this.handleTextClick(index)}
            onItemBlured={() => this.handleTextClick(-1)}
            onTextChange={(v) => this.handleItemChange('text', index, v)}
            onCheckboxChange={(v) => this.handleItemChange('checkbox', index, v)}
          />
        ))}
        <TodoCreate
          placeholder="Split your task into a few smaller tasks"
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default Todo;