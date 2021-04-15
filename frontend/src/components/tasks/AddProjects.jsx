/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import AddInput from '../common/AddInput';
import { ReactComponent as DustbinIcon } from '../../img/svg/dustbin-icon.svg';

const AddProjects = ({ projects = [], addProject, deleteProject }) => {
    const { handleSubmit, register, errors, reset } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        addProject(data?.project);
        reset();
    };

    return (
        <div className="w-full">
            <div
                className="rounded-2xl rounded-b-none w-full p-10 mt-10 grid gap-5"
                style={{ boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.1)' }}
            >
                <h2 className="mb-5">PROJECTS</h2>
                <p>
                    Add the different projects, initiatives or activities that
                    you believe qualify for R&D Tax Credits.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AddInput
                        placeholder="Enter a project name"
                        register={register({
                            required: true,
                            maxLength: {
                                value: 30,
                                message: 'Maximum 30 characters',
                            },
                            validate: (value) =>
                                !projects.includes(value) ||
                                'Project names must be unique',
                        })}
                        name="project"
                        error={errors?.project?.message}
                    />
                </form>
            </div>
            <div
                className="rounded-2xl rounded-t-none w-full p-10 mt-1 flex items-center justify-center"
                style={{ boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)' }}
            >
                {projects?.length === 0 && (
                    <div className="italic text-blue-gray">
                        No projects added yet
                    </div>
                )}
                {projects.length > 0 && (
                    <div className="w-full grid gap-5 text-sm  ">
                        <div className="text-blue-gray-medium font-semibold">
                            ADDED ({projects.length})
                        </div>
                        {projects.map((x) => (
                            <div
                                key={x}
                                className="flex flex-row justify-between items-center"
                            >
                                {x}
                                {deleteProject && (
                                    <DustbinIcon
                                        className="cursor-pointer"
                                        onClick={() => deleteProject(x)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

AddProjects.propTypes = {
    projects: PropTypes.arrayOf([PropTypes.string]).isRequired,
    addProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func,
};

AddProjects.defaultProps = {
    deleteProject: undefined,
};

export default AddProjects;
