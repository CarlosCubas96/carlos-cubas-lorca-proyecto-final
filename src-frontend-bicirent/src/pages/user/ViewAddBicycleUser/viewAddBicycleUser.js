import React, { useState, useEffect } from "react";
import authService from "../../../services/auth/auth.service";
import Form from "react-validation/build/form";
import './viewAddBicycleUser.css';
import FormButton from "../../../components/UI/Button/FormButton/formButton";
import BicycleService from "../../../services/bicycle/bicycle.service";
import SelectFormInput from "../../../components/UI/inputs/SelectFormInput/selectFormInput";
import TextAreaFormInput from "../../../components/UI/inputs/TextAreaFormInput/textAreaFormInput";
import Icon from "../../../components/UI/icon/icon";
import AddFormInput from "../../../components/UI/inputs/AddFormInput/addFormInput";
import { Link, useParams } from "react-router-dom";
import ModalConfirm from "../../../components/UI/Modal/ModalConfirm/modalConfirm";

const required = (value) => {
    if (!value || value.trim() === "") {
        return (
            <div className="login-text-error">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

const vbrandModel = (value) => {
    if (!value || value.trim() === "" || value.length < 3 || value.length > 50) {
        return (
            <div className="login-text-error">
                El modelo de la bicicleta debe tener entre 3 y 50 caracteres.
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

const ViewAddBicycleUser = () => {
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [newBicycle, setNewBicycle] = useState({
        brandModel: "",
        description: "",
        bicycleImage: "",
        owner: { id: null },
        post: { id: id },
        rentalPrice: 0,
        category: { id: null }
    });

    const [isBicycleCreated, setIsBicycleCreated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowConfirmModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_USER')) {
            setNewBicycle(prevState => ({
                ...prevState,
                owner: { id: user.id },
            }));
            getAllCategories();
        }
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0].id);
            setNewBicycle(prevState => ({
                ...prevState,
                category: { id: categories[0].id }
            }));
        }
    }, [categories]);

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            handleChangeCategory(e);
        } else {
            setNewBicycle(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const getAllCategories = () => {
        BicycleService.getAllCategories()
            .then(response => {
                setCategories(response);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }

    const handleChangeCategory = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        setNewBicycle(prevState => ({
            ...prevState,
            category: { id: selectedCategoryId }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        BicycleService.getImageByName(file.name)
            .then(imageName => {
                setImagePreview(imageName.request.responseURL);
                setNewBicycle(prevState => ({
                    ...prevState,
                    bicycleImage: imageName.request.responseURL
                }));
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleCreateBicycle = () => {
        BicycleService.createBicycle(newBicycle)
            .then(response => {
                console.log(response);
                setErrorMessage(null);
                setIsBicycleCreated(true);
                setShowConfirmModal(true);
            })
            .catch(error => {
                setErrorMessage("Error al crear la Bicicleta. Inténtalo de nuevo." + error);
            });

    };

    const handleGoBack = () => {
        window.history.back();
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleModalConfirm = () => {
        setShowConfirmModal(!showModalConfirm);
    };


    return (
        <div className="view-add-post-user-container">
            <div className="view-add-post-user-view-add-post-user">
                <div className="view-add-post-user-containersectionsprogress">
                    <div className="view-add-post-user-containerprogressbuttomclose">
                        <div className="view-add-post-user-containerbuttomtext">
                            <Link to="/user/publicaciones" >
                                <Icon name={"Close"} size="30px"></Icon>
                            </Link>
                        </div>
                    </div>
                    <div className="view-add-post-user-containerprogress">
                        <div className="view-add-post-user-containerprogresstitle">
                            <span className="view-add-post-user-text">
                                <span>Pasos 2/2</span>
                            </span>
                        </div>

                        <div className="view-add-bicycle-user-containerprogressbar">
                            <div className="view-add-bicycle-user-depth6-frame1"></div>
                        </div>
                    </div>
                    <div className="view-add-post-user-containerbuttomprofilesave">
                        <FormButton textColor="#FFFFFF" color="#121417" onClick={toggleModal}>Ayuda</FormButton>
                    </div>
                </div>
                <div className="view-add-post-user-containerdashboardadmin">
                    <div className="view-add-post-user-containerdashboardsections">
                        <div className="view-add-post-user-containermainsection">
                            <div className="view-add-post-user-containermainsectiontitle">
                                <div className="view-add-post-user-containersectiontitle">
                                    <span className="view-add-post-user-text04">
                                        <span>Añadir Bicicleta</span>
                                    </span>
                                </div>
                            </div>
                            <Form className="view-add-post-user-containermainsectioneditprofile">
                                <div className="view-add-post-user-containermainsectionshield">
                                    <AddFormInput
                                        label="Marca de la Bicicleta"
                                        type="text"
                                        name="brandModel"
                                        value={newBicycle.brandModel}
                                        onChange={onChange}
                                        validations={[required, vbrandModel]}
                                        placeholder="Escribe aquí el modelo de la Bicicleta"
                                        disabled={false}
                                    />
                                </div>
                                <div className="view-add-post-user-containermainsectionselect">
                                    <SelectFormInput
                                        label="Selecciona una categoría:"
                                        name="category"
                                        value={selectedCategory}
                                        onChange={handleChangeCategory}
                                        categories={categories}
                                        validations={[required]}
                                        disabled={false}
                                    />
                                </div>
                                <div className="view-add-post-user-containermainsectionshield1">
                                    <TextAreaFormInput
                                        label="Descripción"
                                        name="description"
                                        value={newBicycle.description}
                                        onChange={onChange}
                                        validations={[required, vdescription]}
                                        placeholder="Escribe aquí la descripción de la bicicleta"
                                        disabled={false}
                                    />
                                </div>
                                <div className="view-add-post-user-containermainsectionshield2">
                                    <AddFormInput
                                        label="Precio"
                                        type="number"
                                        name="rentalPrice"
                                        value={newBicycle.rentalPrice}
                                        onChange={onChange}
                                        validations={[required]}
                                        placeholder="Escribe aquí el precio por hora"
                                        disabled={false}
                                    />
                                </div>
                                <div className="dash-board-bicycles-admin-containermainsectionshield3">
                                    <div className="dash-board-bicycles-admin-containersectionshield3">
                                        <div className="dash-board-bicycles-admin-containeruploadimg">
                                            <div className="dash-board-bicycles-admin-containeruploadimgsections">
                                                <div className="dash-board-bicycles-admin-containeruploadimgsectionlabel">
                                                    <div className="dash-board-bicycles-admin-depth9-frame0">
                                                        <div className="dash-board-bicycles-admin-depth10-frame0">
                                                            <span className="dash-board-bicycles-admin-text10">
                                                                <span>Imagen de la bicicleta</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="dash-board-bicycles-admin-containeruploadimgsectionbuttom">
                                                    <label className="dash-board-bicycles-admin-containeruploadbuttomtitle" htmlFor="upload-button">
                                                        <span className="dash-board-bicycles-admin-text12">
                                                            <span>Cambiar</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="upload-button"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        onChange={handleImageChange}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="dash-board-bicycles-admin-containeruploadbuttomicon"
                                                        onClick={() => document.getElementById('upload-button').click()}
                                                    >
                                                        <Icon name="Imagen" size="18px"></Icon>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="dash-board-bicycles-admin-containeruploadimgsectionimg">
                                                <img
                                                    className="dash-board-bicycles-admin-depth8-frame0"
                                                    src={imagePreview || "https://play.teleporthq.io/static/svg/default-img.svg"}
                                                    alt="Bicycle"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="view-add-bicycle-user-containersectionsprogress1">
                    <FormButton textColor="#FFFFFF" color="#121417" onClick={handleGoBack}>Atras</FormButton>

                    {errorMessage && <div className="form-group">
                        <div className="edit-containererror-message">
                            {errorMessage}
                        </div>
                    </div>}

                    {!isBicycleCreated && (
                        <FormButton textColor="#FFFFFF" color="#121417" onClick={handleCreateBicycle}>Anuncia tu Bicicleta</FormButton>
                    )}



                </div>
            </div>
            {showModal && (
                <div className="modal fade show" tabIndex="-2" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ayuda para Añadir Bicicleta</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    <li>Asegúrate de completar todos los campos obligatorios.</li>
                                    <li>El modelo de la bicicleta debe tener entre 3 y 50 caracteres.</li>
                                    <li>La descripción debe tener entre 10 y 200 caracteres.</li>
                                    <li>Selecciona una categoría apropiada para tu bicicleta.</li>
                                    <li>Proporciona un precio de alquiler válido.</li>
                                    <li>Sube una imagen clara de la bicicleta para mejorar su visibilidad.</li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <FormButton textColor="#FFFFFF" color="#121417" onClick={toggleModal}>Cerrar</FormButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isBicycleCreated && (
                <ModalConfirm
                    title={"Publicación Realizada"}
                    body={"Has creado una publicación, en unos minutos se te enviará una notificación de que la publicacion será aprobada"}
                    show={toggleModalConfirm}
                    onConfirm={"/user/publicaciones"}
                />)}

        </div>


    );
};

export default ViewAddBicycleUser;
