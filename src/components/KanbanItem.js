import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import _isEmpty from 'lodash/isEmpty';

const KanbanItem = (props) => {
  const { item, rf, highlighted, onAvatarOver, ...deafultProps } = props;
  const { id, title, text, reporter, assignee, deadline, creationDate, priority} = item;

  // const assigneeAvatar = assignee ? `${process.env.PUBLIC_URL}/${assignee.avatar}` : '';
  const assigneeAvatar = assignee ? assignee.avatar : '';

  const deadlineDate = new Date(deadline);
  const deadlineWarningTime = moment().add(12, 'hours').toDate();

  const deadlineExpired = deadline && deadlineDate < new Date();
  const deadlineIsClose = deadline && deadlineDate <= deadlineWarningTime;

  let deadlineCN = "kanban-board-item__deadline";
  let headerCN = "kanban-board-item__header";

  if (item.status === 'done') {
    headerCN = "kanban-board-item__header kanban-board-item__header--done";
  } else {
    if (deadlineExpired) {
      deadlineCN += " kanban-board-item__deadline--expired";
      headerCN += " expired";
    } else if (deadlineIsClose) {
      deadlineCN += " kanban-board-item__deadline--soon";
      headerCN += " warning";
    } else {
      deadlineCN += " translucent";
    }
  }

  return (
    <div
      className={"kanban-board-item" + (highlighted ? " highlighted" : "")}
      ref={rf}
      {...deafultProps}
    >
      <div className={headerCN}>
        <span>
          {'#' + id}
        </span>
        {!_isEmpty(assignee) && (
          <Fragment>
            <span className="kanban-board-item__assignee-username">
              {assignee && assignee.userName}
            </span>
            <div
              className="kanban-board-item__assignee-avatar"
              onMouseOver={() => onAvatarOver((assignee && assignee.id) || -1)}
              onMouseLeave={() => onAvatarOver(-1)}
            >
              <img
                src={assigneeAvatar}
                alt={assignee && assignee.userName}
                width="30"
                height="auto"
              />
            </div>
          </Fragment>
        )}
      </div>
      <div className={deadlineCN}>
        { deadline ?
          <Fragment>
            <span>deadline: </span>
            <span>{moment(deadline).format('LL')} </span>
            <span>({moment(deadline).fromNow().split(' ').join('\u00A0')})</span>
          </Fragment>
          :
          <Fragment>
            <span>No deadline!</span>
          </Fragment>
        }
      </div>
      <p className="kanban-board-item__title">
        {title}
      </p>
      <p className="kanban-board-item__text">
        {text}
      </p>
      <div className="kanban-board-item__footer">
        <div className="kanban-board-item__priority-stars">
          {priority && Array.from(new Array(priority)).map((item, index) =>
            <FontAwesomeIcon icon="star" key={index}/>
          )}
        </div>
        <span>Created </span>
        <span> {moment(creationDate).fromNow()}</span>
        <span> by {reporter.userName}</span>
      </div>
      <button className="kanban-board-item__edit-button">
        <FontAwesomeIcon icon="info-circle"/>
      </button>
    </div>
  )
};

KanbanItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    project: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired,
    reporter: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }).isRequired,
    assignee: PropTypes.shape({
      userName: PropTypes.string,
      avatar: PropTypes.string
    }),
    deadline: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
      PropTypes.string
    ]),
    creationDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
      PropTypes.string
    ]).isRequired,
    priority: PropTypes.number.isRequired,
    subtasks: PropTypes.array,
    activity: PropTypes.array
  }),
  rf: PropTypes.func.isRequired
}

export default (KanbanItem);
