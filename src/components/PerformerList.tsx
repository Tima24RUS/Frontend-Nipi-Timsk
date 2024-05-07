// import React, {useState, useEffect} from "react";
// import { List, Badge, Avatar, Calendar, Input, Button, Select, Spin} from 'antd';
// import PerformerCalendar from "./PerformerCalendar";
// import { format } from "path";




// interface Task {
//     id: number;
//     userName:string;
//     fullName:string;
//     avatarUrl: string;
//     title: string;
//     updatedAt: string;
//     // projects: Project[];
// }

// // interface Project {
// //     id: number;
// //     name: string;
// //     issues: Issue[]; 
// // }

// // interface Issue {
// //     title: string;
// //     webUrl: string;
// //     updatedAt: string;
// //     timeEstimate: number;
// //     humanTimeEstimate: string;
// // }


// const PerformerList: React.FC = () => {
//     const [tasks, setTasks] = useState<Task[]>([]);
//     const [selectedUser, setSelectedUser] = useState<Task | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>('');

    
//     useEffect(() => {
//         const fetchData =async () => {
//             try {
//                 const response = await fetch('http://localhost:16895/api/Issue/GetUsers', {
//                     credentials: "include",
//                   });
                
//                 const data: Task[] = await response.json();
//                 setTasks(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleUserClick = (user: Task) => {
//         setSelectedUser(user);
//     };

//     const filteredUsers = tasks.filter(task => task.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

//     return (
//         <div className="task-form">
//             <div className="scroll-list">
//                 <h3>Исполнитель</h3>
//                 <div className="search-input">
//                     <Input 
//                         placeholder="Поиск исполнителей"
//                         value={searchTerm}                        
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 {tasks.length === 0 ? (
//                     <div style={{textAlign: 'center', width: '100%', marginTop: '70%' }}>
//                         <Spin size="large" />
//                     </div>
//                 ) : (    
//                     <List 
//                         dataSource={filteredUsers}
//                         renderItem={(task: Task) => (
//                             <List.Item>
//                                 <Button type="link" onClick={() => handleUserClick(task)}>
//                                     <Avatar src={task.avatarUrl} /> {task.fullName}
//                                 </Button>
//                             </List.Item>
//                         )}
//                     />
//                 )}    
//             </div>
//             {selectedUser && (
//                 <div className="calendar-container">
//                     <PerformerCalendar 
                        
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PerformerList;

import React, {useState, useEffect} from "react";
import { List, Badge, Avatar, Calendar, Input, Button, Select} from 'antd';
import PerformerCalendar from "./PerformerCalendar";
// import './PerformerLost.css';


interface Task {
    id: number;
    userName:string;
    fullName:string;
    avatarUrl: string;
}


const PerformerList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedUser, setSelectedUser] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
  
    

    useEffect(() => {
        const fetchData =async () => {
            try {
                const response = await fetch('http://localhost:16895/api/Issue/GetUsers', {
                    credentials: "include",
                  });
                
                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleUserClick = (user: Task) => {
        setSelectedUser(user);
    };

    const filteredUsers = tasks.filter(task => task.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="task-form">
            <div className="scroll-list">
                <h3>Исполнитель</h3>
                <div className="search-input">
                    <Input 
                        placeholder="Поиск исполнителей"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>    
                <List 
                    dataSource={filteredUsers}
                    renderItem={(task: Task) => (
                        <List.Item>
                            <Button type="link" onClick={() => handleUserClick(task)}>
                                <Avatar src={task.avatarUrl} /> {task.fullName}
                            </Button>
                        </List.Item>
                    )}
                />
            </div>
            <div className="scroll-list2">
                {selectedUser && (
                    <>
                        
                            <PerformerCalendar />                      
                    </>
                )}
            </div>
        </div>
    );
};

export default PerformerList;