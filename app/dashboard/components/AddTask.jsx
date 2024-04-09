"use client";
import { Button, Modal } from "flowbite-react";
import React, { useRef, useEffect } from "react";

const AddTask = ({ router, handleModal, data = {}, isOpen = false }) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (Object.entries(data).length) {
      const form_data = new FormData();
      form_data.set("taskName", "work");
    }
    return () => {
      resetForm();
    };
  }, [data]);

  const resetForm = () => {
    formRef.current?.reset();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const taskName = form_data.get("taskName");
    const payload = {
      taskName: taskName,
      isCompleted: false,
    };
    if (Object.entries(data).length) {
      editTask({ payload: payload });
    } else addTask({ payload: payload });
  };

  const addTask = async ({ payload }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URI}/api/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        router.refresh();
      } else {
        console.log("Data Not Inserted.");
      }
    } catch (err) {
      console.log("Error");
    }
    handleModal(false);
    resetForm();
  };

  const editTask = async ({ payload }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PORTAL_URI}/api/todo?id=${data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        router.refresh();
      } else {
        console.log("Data Modified Successfully.");
      }
    } catch (err) {
      console.log("Error");
    }
    handleModal(false);
    resetForm();
  };

  return (
    <Modal show={isOpen} className="modal" onClose={() => handleModal(false)}>
      <form onSubmit={onSubmit} ref={formRef}>
        <Modal.Header>Add Task</Modal.Header>
        <Modal.Body>
          <div className=" w-96 max-w-5xl">
            <div className=" flex-col my-0">
              <div className="py-4">
                <label className="text-sm px-2 leading-8">Task Name: </label>
                <input
                  type="text"
                  placeholder="Add Task"
                  className="input input-bordered w-full max-w-xs"
                  name="taskName"
                  defaultValue={data?.taskName || ""}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" onClick={() => handleModal(false)}>
            Close
          </Button>
          <Button type="submit">
            {Object.entries(data).length ? "Edit Task" : "Add Task"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddTask;
