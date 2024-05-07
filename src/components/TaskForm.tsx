import React, {useState, useEffect} from "react";
import './TaskForm.css';
import { title } from "process";
import {List, Avatar, Button, Input, Spin} from "antd";
/*import 'antd/dist/antd.css';*/
/*import axios from 'axios';*/

interface Task {
    id: number;
    userName: string;
    fullName: string;
    avatarUrl: string;
    projects: Project[];
}

interface Project {
    id: number;
    name: string;
    issues: Issue[];
}

interface Issue {
    title: string;
    webUrl:string;
}

const TaskForm: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedUser, setSelectedUser] = useState<Task | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [allTasks, setAllTasks] = useState<Issue[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchData =async () => {
            try {
                const response = await fetch(/*'tasks.json'*/'http://localhost:16895/api/Issue/GetUsers', {
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
        setSelectedProject(null);
        
        const userTasksArray: Issue[] = user.projects.reduce((accumulator: Issue[], project: Project) => {
            accumulator.push(...project.issues);
            return accumulator;
        }, []);
        setAllTasks(userTasksArray);
    };

    const handleProjectClick = (project: Project) => {
       if (selectedProject && selectedProject.id === project.id) {
        setSelectedProject(null);
        const userTasksArray: Issue[] = selectedUser!.projects.reduce((accumulator: Issue[], proj: Project) => {
            accumulator.push(...proj.issues);
            return accumulator;
        }, []);
        setAllTasks(userTasksArray);
      } else {
        setSelectedProject(project);
        setAllTasks(project.issues)
      }
    };

    const filteredUsers = tasks.filter(task => task.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="task-form">
            <div className="scroll-list">
                <h3>Исполнитель</h3>
                <div className="search-input">
                    <Input 
                        placeholder="Поиск исполнителей"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>    
                {tasks.length === 0 ? (
                    <div style={{textAlign: 'center', width: '100%', marginTop: '70%' }}>
                        <Spin size="large" />
                    </div>
                ) : (    
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
                )}
            </div>
            <div className="scroll-list">
                <h3>Проекты</h3>
                {tasks.length > 0 && (
                    <>
                        {/* <h3>Проекты</h3> */}
                        <List 
                            dataSource={selectedUser?.projects || []}
                            renderItem={(project: Project) => (
                                <List.Item>
                                    <Button type="link" onClick={() => handleProjectClick(project)}>{project.name}</Button>
                                </List.Item>
                            )}
                        />
                    </>
                )}
            </div>
            <div className="scroll-list">
                
                <>
                    <center><h3>Задачи</h3></center>
                    <List 
                        dataSource={allTasks}
                        renderItem={(issue: Issue) => (
                            <List.Item>
                                <a href={issue.webUrl} target="_blank" rel="noopener noreferrer">{issue.title}</a>
                            </List.Item>
                        )}
                    />
                </>
                
            </div>
        </div>
    );
};

export default TaskForm;