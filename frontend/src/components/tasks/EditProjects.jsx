import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { quotePropShape } from '../../tools/utilities/transforms';
import { ReactComponent as BackIcon } from '../../img/svg/back-icon.svg';
import Button from '../common/Button';
import AddProjects from './AddProjects';
import { updateProjectsThunk } from '../../tools/redux/thunks/quoteThunks';

const EditProjects = ({ quote }) => {
    const dispatch = useDispatch();
    const [projects, setProjects] = useState(
        quote?.projects ? quote?.projects?.split(',') : [],
    );
    const addProject = (project) => setProjects([project, ...projects]);

    const updateProjects = () => {
        const newQuote = { ...quote, projects: projects.join(',') };
        dispatch(updateProjectsThunk(newQuote));
    };

    const deleteProject = (project) => {
        const newProjects = projects.filter((x) => x !== project).join(',');
        const newQuote = { ...quote, projects: newProjects };
        dispatch(updateProjectsThunk(newQuote)).then((res) => {
            if (!res?.error) {
                setProjects(newProjects?.split(','));
            }
        });
    };

    return (
        <div className="flex flex-col items-start justify-center">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="grid grid-flow-col gap-5 items-center">
                    <NavLink to="/dashboard">
                        <BackIcon />
                    </NavLink>
                    <h1>Edit projects</h1>
                </div>
                <Button
                    primary
                    content="Save"
                    form="rd-detail-form"
                    onClick={updateProjects}
                />
            </div>
            <AddProjects
                projects={projects}
                addProject={addProject}
                deleteProject={deleteProject}
            />
        </div>
    );
};

EditProjects.propTypes = {
    quote: PropTypes.shape(quotePropShape).isRequired,
};

EditProjects.defaultProps = {};

export default EditProjects;
