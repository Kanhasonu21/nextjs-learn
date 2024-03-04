"use client";
import React, { useState } from "react";
import Image from "next/image";

import EditIconImage from "../../assets/edit.svg";
import EditIconAni from "../../assets/editanimation.gif";
import DeleteIcon from "../../assets/delete.svg";
import DeleteIconAni from "../../assets/deleteanimation.gif";
import PlusIcon from "../../assets/plus.svg";
import ImageAnimation from "./ImageAnimation";
import { useRouter } from "next/navigation";
import AddTask from "./AddTask";
import { motion } from 'framer-motion';

const Dashboard = ({ todoList = [] }) => {
  const [data, setData] = useState({});
  const router = useRouter();

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/todo?id=${taskId}`, {
        method: "DELETE",
      });
      if (response) {
        router.refresh();
      }
    } catch (err) {
      console.log("Error");
    }
  };
  const handleModal = (open = false) => {
    if (open) {
      document.getElementById("my_modal_1").showModal();
    } else {
      document.getElementById("my_modal_1").close();
    }
    setData({})
  };

  const handleEdit = (taskData)=> {
    setData(taskData);
    document.getElementById("my_modal_1").showModal()
  }
  return (
    <div className="p-4">
      <AddTask router={router} handleModal={handleModal} data={data} />
      <div className="flex justify-center">
        <motion.button
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}
          className="btn btn-active btn-glass w-3/6"
          onClick={() => handleModal(true)}
        >
          <Image src={PlusIcon} height={25} />
          Add Task
        </motion.button>
      </div>
      <div className="overflow-x-auto flex justify-center p-8">
        <table className="table p-10 w-3/6">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Task Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((task, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{task.taskName}</td>
                <td>
                  <div className="w-fit" onClick={() => handleEdit(task)}>
                    <ImageAnimation
                      plainImage={EditIconImage}
                      animatedImage={EditIconAni}
                    />
                  </div>
                </td>
                <td>
                  <div className="w-fit" onClick={() => deleteTask(task._id)}>
                    <ImageAnimation
                      plainImage={DeleteIcon}
                      animatedImage={DeleteIconAni}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
