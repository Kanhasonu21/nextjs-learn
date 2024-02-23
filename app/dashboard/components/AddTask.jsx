"use client"
import React, { useRef, useEffect } from 'react'

const AddTask = ({ router, handleModal, data = {} }) => {
    const formRef = useRef(null);

    useEffect(() => {
        if (Object.entries(data).length) {
            const form_data = new FormData();
            form_data.set('taskName', 'work')
        }
        return () => {
            resetForm();

        }
    }, [data])

    const resetForm = () => {
        formRef.current?.reset();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const form_data = new FormData(e.target);
        const taskName = form_data.get('taskName');
        const payload = {
            taskName: taskName,
            isCompleted: false
        }
        if (Object.entries(data).length) {
            editTask({ payload: payload })
        } else addTask({ payload: payload });

    }

    const addTask = async ({ payload }) => {
        try {
            const response = await fetch(`http://localhost:3000/todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                router.refresh()
            } else {
                console.log('Data Not Inserted.')
            }
        } catch (err) {
            console.log('Error')
        }
        document.getElementById('my_modal_1').close();
        resetForm();
    }

    const editTask = async ({ payload }) => {
        try {
            const response = await fetch(`http://localhost:3000/todo?id=${data._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                router.refresh()
            } else {
                console.log('Data Modified Successfully.')
            }
        } catch (err) {
            console.log('Error')
        }
        document.getElementById('my_modal_1').close();
        resetForm();
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <form onSubmit={onSubmit} ref={formRef}>
                <div className="modal-box w-96 max-w-5xl">
                    <div className="flex justify-center py-2 border-b-2 border-neutral-100	 ">
                        <h1 className="text-2xl">Add Task</h1>
                    </div>

                    <div className="modal-action flex-col my-0">
                        <div className="py-4">
                            <label className="text-sm px-2 leading-8">Task Name: </label>
                            <input
                                type="text"
                                placeholder="Add Task"
                                className="input input-bordered w-full max-w-xs"
                                name="taskName"
                                defaultValue={data?.taskName || ''}
                            />
                        </div>
                        <div className="pt-2 !ml-0">
                            <button type="reset" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleModal()}>✕</button>
                            <button className="btn" type='submit'>{Object.entries(data).length ? 'Edit Task' : 'Add Task'}</button>
                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_1">Close</label>
                    </div>
                </div>
            </form>

        </dialog>
    )
}

export default AddTask