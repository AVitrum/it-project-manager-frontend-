import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/project.css";
import "../../assets/tasks.css";
import { AssignmentResponse } from "../../types/responses";
import { useGetTasksQuery } from "../../features/task/getAllTasksByProjectIdApiSlice";
import Sidebar from "../../components/ui/Sidebar";
import TaskModal from "../../components/ui/TaskModal";

function TasksPage() {
    const { id } = useParams<string>();
    const navigate = useNavigate();

    const {
        data: data,
        isLoading,
        isSuccess
    } = useGetTasksQuery({ id: id });


    function convertDate(dateToConvert: string) {
        const date = new Date(dateToConvert);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleDateString('uk-UA', options);
    }

    const [taskDetails, setTaskDetails] = useState<AssignmentResponse | null>(null);

    let content;

    if (isLoading) {
        content = <div className="main-project-container">
            <div className="project-centered-content">
                <div className="project-content">
                    Loading...
                </div>
            </div>
        </div>
    } else if (isSuccess) {
        const tasks: AssignmentResponse[] = data;
        content = <div className="main-project-container">
            <div><Sidebar /></div>
            <div className="tasks-centered-content">
                <div className="tasks-content">
                    <div className="task-row">
                        <div className="task-column">
                            <h3>Not Assigned</h3>
                            {tasks.map((task) => (
                                task.type == "ASSIGNED" ? <div className="task-content">
                                    <h1>{task.theme}</h1>
                                    <p>Deadline: {convertDate(task.deadline)}</p>
                                    <div className="button-container-task">
                                        <button onClick={() => setTaskDetails(task)}><i className="bi bi-info-circle"></i> Details</button>
                                        <button onClick={() => navigate(`/${id}/task/${task.id}/update`)}><i className="bi bi-sliders"></i></button>
                                    </div>
                                </div> : <></>
                            ))}
                        </div>
                        <div className="task-column">
                            <h3>In Review</h3>
                            {tasks.map((task) => (
                                task.type == "IN_REVIEW" ? <div className="task-content">
                                    <h1>{task.theme}</h1>
                                    <p>Deadline: {convertDate(task.deadline)}</p>
                                    <div className="button-container-task">
                                        <button onClick={() => setTaskDetails(task)}><i className="bi bi-info-circle"></i> Details</button>
                                        <button onClick={() => navigate(`/${id}/task/${task.id}/update`)}><i className="bi bi-sliders"></i></button>
                                    </div>
                                </div> : <></>
                            ))}
                        </div>
                        <div className="task-column">
                            <h3>Completed</h3>
                            {tasks.map((task) => (
                                task.type == "COMPLETED" ? <div className="task-content">
                                    <h1>{task.theme}</h1>
                                    <p>Deadline: {convertDate(task.deadline)}</p>
                                    <div className="button-container-task">
                                        <button onClick={() => setTaskDetails(task)}><i className="bi bi-info-circle"></i> Details</button>
                                        <button onClick={() => navigate(`/${id}/task/${task.id}/update`)}><i className="bi bi-sliders"></i></button>
                                    </div>
                                </div> : <></>
                            ))}
                        </div>
                        <div className="task-column">
                            <h3>Overdue</h3>
                            {tasks.map((task) => (
                                task.type == "OVERDUE" ? <div className="task-content">
                                    <h1>{task.theme}</h1>
                                    <p>Deadline: {convertDate(task.deadline)}</p>
                                    <div className="button-container-task">
                                        <button onClick={() => setTaskDetails(task)}><i className="bi bi-info-circle"></i> Details</button>
                                        <button onClick={() => navigate(`/${id}/task/${task.id}/update`)}><i className="bi bi-sliders"></i></button>
                                    </div>
                                </div> : <></>
                            ))}
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="edit-button" onClick={() => navigate(`/${id}/task/create`)}>Create New Task</button>
                        <button className="edit-button" onClick={() => navigate(`/project/${id}`)}>Project</button>
                        <button className="edit-button" onClick={() => navigate(`/dashboard`)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <>
            {content}
            {taskDetails && <TaskModal task={taskDetails} onClose={() => setTaskDetails(null)} />}
        </>
    );
}

export default TasksPage;
