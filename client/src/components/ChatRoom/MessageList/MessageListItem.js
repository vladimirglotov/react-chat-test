import TimeAgo from 'react-timeago'
import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai'


const ItemCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemCardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  padding: 4px;
  border-radius: 4px;
  color: black;
`;

// передаем объект сообщения и функцию для удаления сообщений
export const MessageListItem = ({ msg, removeMessage }) => {

  const { messageId, messageText, senderName, createdAt, currentUser } = msg
  // обрабатываем удаление сообщений
  const handleRemoveMessage = (id) => {
    removeMessage(id)
  }

  const ItemWrapper = styled.div`
    display: flex;
    justify-content: ${currentUser ? 'flex-end' : 'flex-start'};
  `;
  
  const ItemCard = styled.div`
    width: 55%;
    background-color: ${currentUser ? 'blue' : 'grey'};
    margin: 5px;
    padding: 0 5px 0 5px;
    border-radius: 5px;
    color: white;
  `;

  return (
    <ItemWrapper
    >
      <ItemCard>
        <ItemCardHeader >
          {/* передаем TimeAgo дату создания сообщения */}
          <TimeAgo date={createdAt} className='small' />
          <span>{senderName}</span>
        </ItemCardHeader>
        <ItemCardBody>
          <p>{messageText}</p>
          {/* удалять сообщения может только отправивший их пользователь */}
          {currentUser && (
            <Button
              onClick={() => handleRemoveMessage(messageId)}
            >
              <AiOutlineDelete />
            </Button>
          )}
        </ItemCardBody>
      </ItemCard>
    </ItemWrapper>
  )
}