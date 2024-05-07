import React, { useState } from 'react';
import { Dayjs } from 'dayjs';
import { Badge, Calendar } from 'antd';
import type { CalendarProps } from 'antd';
// import type { Task } from './Task';


// interface CalendarProps {
//   tasks: Task[];
//   selectedUserId: number;
//   onPanelChange: (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => void;
//   onDateClick:
// }

// const PerformerCalendar: React.FC<CalendarProps> = ({ tasks, selectedUserId, onPanelChange }) => {
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

//   const handleDateClick = (date: Dayjs) => {
//     setSelectedDate(date);
//   };

//   const handleDateChange = (date: Dayjs) => {
//     onPanelChange(date, 'manth');
//   };

//   return (
//     <Calendar 
//       dateCellRender={(date) => {
//         const task = tasks.find(task => task.id === selectedUserId && task.updatedAt === date.format('YYY-MM-DD'));
//         if (task) {
//           return (
//             <div>
//               <Badge count={task.id} />
//               <p>{task.fullName}</p>
//             </div>
//           );
//         }
//         return null;
//       }} 
//       onPanelChange={handleDateChange}
//       onDateClick={handleDateClick}
//     />
//   )
// }

const PerformerCalendar: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <Calendar onPanelChange={onPanelChange} />;
};

export default PerformerCalendar;


