"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import EditIconImage from "../../assets/edit.svg";
import EditIconAni from "../../assets/editanimation.gif";
import DeleteIcon from "../../assets/delete.svg";
import DeleteIconAni from "../../assets/deleteanimation.gif";
import PlusIcon from "../../assets/plus.svg";
import ImageAnimation from "./ImageAnimation";
import { useRouter } from "next/navigation";
import AddTask from "./AddTask";
import { Button,Table } from "flowbite-react";

const Dashboard = ({ todoList = [] }) => {
  const [data, setData] = useState({});
  const [isAddTaskModalOpen, setAddModal] = useState(false);
  const router = useRouter();

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URI}/api/todo?id=${taskId}`, {
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
      setAddModal(true);
    } else {
      setAddModal(false);
    }
    setData({});
  };

  const handleEdit = (taskData) => {
    setData(taskData);
    handleModal(true)
  };
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 dashboard">
      <AddTask
        router={router}
        handleModal={handleModal}
        data={data}
        isOpen={isAddTaskModalOpen}
      />
      <div className="flex justify-center">
        <Button className="w-3/6 btn-p" pill onClick={() => handleModal(true)}>
        <Image src={PlusIcon} height={20} className="mr-2" alt="add-image"/>{"  "}
          Add Task
        </Button>
      </div>
      <div className="flex justify-center p-8">
        <Table border={1}  striped className="p-10 w-full">  
          <Table.Head>
            <Table.HeadCell>S No.</Table.HeadCell>
            <Table.HeadCell>Task Name</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {todoList.map((task, idx) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={idx}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {idx + 1}
                </Table.Cell>
                <Table.Cell>{task.taskName}</Table.Cell>
                <Table.Cell>
                  <div className="w-fit" onClick={() => handleEdit(task)}>
                    <ImageAnimation
                      plainImage={EditIconImage}
                      animatedImage={EditIconAni}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="w-fit" onClick={() => deleteTask(task._id)}>
                    <ImageAnimation
                      plainImage={DeleteIcon}
                      animatedImage={DeleteIconAni}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
