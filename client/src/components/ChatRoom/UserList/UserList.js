import { Accordion, Card, Button, Badge } from 'react-bootstrap'
// иконка - индикатор статуса пользователя
import { RiRadioButtonLine } from 'react-icons/ri'

// передаем объект с пользователями 
export const UserList = ({ users }) => {
  // преобразуем в массив
  const usersArr = Object.entries(users)

  // количество активных пользователей
  const activeUsers = usersArr.filter(([id, obj]) => obj.online)

  return (
    <select defaultValue={'def'} name="select">
      <option value="def" disabled>Активные пользователи</option>
      {activeUsers.map(([userId, obj]) => {
        return (<option key={userId}>
          {obj.username}</option>);
      })}
    </select>
  )
}