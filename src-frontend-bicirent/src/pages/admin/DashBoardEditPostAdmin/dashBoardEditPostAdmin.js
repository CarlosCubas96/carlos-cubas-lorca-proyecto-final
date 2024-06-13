import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../../components/common/layout/header/header";
import authService from "../../../services/auth/auth.service";
import SidebarsectionAdmin from "../../../components/admin/aside/sidebarsectionAdmin";
import Form from "react-validation/build/form";
import './dashBoardEditPostAdmin.css';
import EditFormInput from "../../../components/UI/inputs/EditFormInput/editFormInput";
import FormButton from "../../../components/UI/Button/FormButton/formButton";
import CheckBoxFormInput from "../../../components/UI/inputs/CheckboxFormInput/checkboxFormInput";
import PostService from "../../../services/post/post.service";
import SelectFormInput from "../../../components/UI/inputs/SelectFormInput/selectFormInput";
import TextAreaFormInput from "../../../components/UI/inputs/TextAreaFormInput/textAreaFormInput";
import Icon from "../../../components/UI/icon/icon";

const required = (value) => {
    if (!value || value.trim() === "") {
        return (
            <div className="login-text-error">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

const vpostName = (value) => {
    if (!value || value.trim() === "" || value.length < 3 || value.length > 50) {
        return (
            <div className="login-text-error">
                El nombre de la publicación debe tener entre 3 y 50 caracteres.
            </div>
        );
    }
};

const vdescription = (value) => {
    if (!value || value.trim() === "" || value.length < 10 || value.length > 200) {
        return (
            <div className="login-text-error">
                La descripción debe tener entre 10 y 200 caracteres.
            </div>
        );
    }
};

const votherDetails = (value) => {
    if (!value || value.trim() === "" || value.length < 10 || value.length > 200) {
        return (
            <div className="login-text-error">
                Los detalles adicionales deben tener entre 10 y 200 caracteres.
            </div>
        );
    }
};



const DashBoardEditPostAdmin = () => {
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [currentEditPost, setCurrentEditPost] = useState({
        id: null,
        category: { id: null },
        description: '',
        otherDetails: '',
        postStatus: '',
        postName: '',
        tags: []
    });

    const [editable, setEditable] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_ADMIN')) {
            setCurrentUser(user);
            getPostId(id);
            getAllCategories();
        }
    }, [id]);

    const getPostId = (id) => {
        PostService.getPostById(id)
            .then(response => {
                setSelectedCategory(response.category.id);
                setCurrentEditPost({
                    ...response,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            handleChangeCategory(e);
        } else {
            setCurrentEditPost(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const getAllCategories = () => {
        PostService.getAllCategories()
            .then(response => {
                setCategories(response);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }

    const handleEdit = () => {
        setEditable(prevState => !prevState);
        setMessage(null);
        setErrorMessage(null);
    };

    const handleChangeCategory = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        setCurrentEditPost(prevState => ({
            ...prevState,
            category: { id: selectedCategoryId }
        }));
    };

    const handleUpdatePost = () => {
        PostService.updatePost(id, currentEditPost)
            .then(currentEditPost => {
                setEditable(false);
                setMessage("Publicación actualizada exitosamente!");
                setErrorMessage(null);
            })
            .catch(error => {
                setErrorMessage("Error al actualizar la Publicación. Inténtalo de nuevo." + error);
                setMessage(null);
            });
    };


    const handleAddTag = (e) => {
        e.preventDefault();
        if (newTag) {
            const tag = { id: currentEditPost.id, tagName: newTag }; // Asignar un id único a la etiqueta
            setNewTag("");
            // Llamada al servicio para agregar la etiqueta al post
            PostService.addTagToPost(currentEditPost.id, { tagName: newTag })
                .then(response => {
                    // Actualizar la lista de etiquetas del post después de agregar la nueva etiqueta
                    setCurrentEditPost(prevState => ({
                        ...prevState,
                        tags: [...prevState.tags, tag]
                    }));
                })
                .catch(error => {
                    console.error("Error al agregar la etiqueta:", error);
                });
        }
    };



    const handleRemoveTag = (tagId) => {

        setCurrentEditPost(prevState => ({
            ...prevState,
            tags: prevState.tags.filter(tag => tag.id !== tagId)
        }));
        // Llamada al servicio para eliminar la etiqueta del post
        PostService.removeTagFromPost(id, tagId)
            .then(() => {
            })
            .catch(error => {
                console.error("Error al eliminar la etiqueta:", error);
            });
    };

    return (
        <div className="admin-dashboard-main-container">
            <div className="admin-dashboard-main-dash-board-main-admin">
                <Header currentUser={currentUser} />
                <div className="admin-dashboard-main-containerdashboardadmin">
                    <div className="admin-dashboard-main-containerdashboardsections">
                        <SidebarsectionAdmin />
                        <div className="dash-board-edit-post-admin-containermainsection">
                            <div className="dash-board-edit-post-admin-containermainsectiontitle">
                                <div className="dash-board-edit-post-admin-containersectiontitle">
                                    <span className="dash-board-edit-post-admin-text">
                                        Gestión de Publicación
                                    </span>
                                </div>
                            </div>

                            <Form className="dash-board-edit-post-admin-containermainsectioneditprofile">
                                <div className="dash-board-edit-post-admin-containermainsectionshield">
                                    <EditFormInput
                                        label="Nombre de la Publicación"
                                        type="text"
                                        placeholder={currentEditPost.postName}
                                        name="postName"
                                        value={currentEditPost.postName}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required, vpostName]}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionselect">
                                    <SelectFormInput
                                        label="Selecciona una categoría:"
                                        name="category"
                                        value={selectedCategory}
                                        onChange={handleChangeCategory}
                                        disabled={!editable}
                                        categories={categories}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionshield1">
                                    <TextAreaFormInput
                                        label="Descripcion"
                                        placeholder={currentEditPost.description}
                                        name="description"
                                        value={currentEditPost.description}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required, vdescription]}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionshield2">
                                    <TextAreaFormInput
                                        label="Detalles Adicionales"
                                        placeholder={currentEditPost.otherDetails}
                                        name="otherDetails"
                                        value={currentEditPost.otherDetails}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required, votherDetails]}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionshield3">
                                    <div className="dash-board-edit-post-admin-containersectionshield3">
                                        <div className="dash-board-edit-post-admin-containershield3">
                                            <div className="dash-board-edit-post-admin-containersectiontaglabel">
                                                <span className="dash-board-edit-post-admin-text09">
                                                    <span>Etiquetas</span>
                                                </span>
                                                <div>
                                                    <div className="dash-board-edit-post-admin-containersectiontagconttadd">
                                                        <input className="dash-board-edit-post-admin-containersectiontagcaddinput"
                                                            type="text"
                                                            placeholder="Añadir Nueva Etiqueta"
                                                            value={newTag}
                                                            onChange={(e) => setNewTag(e.target.value)}
                                                            disabled={!editable}
                                                        />
                                                        <button className="dash-board-edit-post-admin-containersectiontagcaddbuttom" onClick={handleAddTag}>Agregar</button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="dash-board-edit-post-admin-containersectiontagmain">
                                                <div className="dash-board-edit-post-admin-containersectiontag">
                                                    <div className="dash-board-edit-post-admin-inputtag">
                                                        {currentEditPost.tags.map((tag, index) => (
                                                            <div key={index} className="dash-board-edit-post-admin-containersectiontag1">
                                                                <div className="dash-board-edit-post-admin-containertagname">
                                                                    <div className="dash-board-edit-post-admin-tagname">
                                                                        <span className="dash-board-edit-post-admin-text11">
                                                                            <span>{tag.tagName}</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <button disabled={!editable} className="dash-board-edit-post-admin-containertagclose" onClick={() => handleRemoveTag(tag.id)}>
                                                                    <Icon name="Close" size="20px"></Icon>
                                                                </button>

                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionshield3">
                                    <CheckBoxFormInput
                                        label="Estado del Alquiler"
                                        name="postStatus"
                                        options={[
                                            { value: 'DISPONIBLE', label: 'Disponible' },
                                            { value: 'ALQUILADO', label: 'Alquilado' },
                                            { value: 'NODISPONIBLE', label: 'No Disponible' }
                                        ]}
                                        selectedValue={currentEditPost.postStatus}
                                        onChange={onChange}
                                        disabled={!editable}
                                        validations={[required]}
                                    />
                                </div>
                            </Form>
                            <div className="dash-board-edit-post-admin-containermainsectionbuttoms">
                                <FormButton onClick={handleEdit}>Editar</FormButton>
                                <FormButton onClick={handleUpdatePost}>Guardar</FormButton>
                                {message && <div className="form-group">
                                    <div className="edit-containermessage-message">
                                        {message}
                                    </div>
                                </div>}
                                {errorMessage && <div className="form-group">
                                    <div className="edit-containererror-message">
                                        {errorMessage}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardEditPostAdmin;