import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../../components/common/layout/header/header";
import bicycleService from "../../../services/bicycle/bicycle.service";
import authService from "../../../services/auth/auth.service";
import SidebarsectionAdmin from "../../../components/admin/aside/sidebarsectionAdmin";
import Form from "react-validation/build/form";
import './dashBoardEditBicycleAdmin.css';
import EditFormInput from "../../../components/UI/inputs/EditFormInput/editFormInput";
import SelectFormInput from "../../../components/UI/inputs/SelectFormInput/selectFormInput";
import FormButton from "../../../components/UI/Button/FormButton/formButton";
import Icon from "../../../components/UI/icon/icon";
import TextAreaFormInput from "../../../components/UI/inputs/TextAreaFormInput/textAreaFormInput";

const required = value => {
    if (!value) {
        return (
            <div className="login-text-error">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="login-text-error">
                El nombre de usuario debe tener entre 3 y 20 caracteres.
            </div>
        );
    }
};


const DashBoardEditBicycleAdmin = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [categories, setCategories] = useState([]);
    const [currentEditBicycle, setCurrentEditBicycle] = useState({
        id: null,
        brandModel: "",
        description: "",
        bicycleImage: "",
        owner: { username: "" },
        rentalPrice: 0,
        category: { id: null }
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [editable, setEditable] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_ADMIN')) {
            setCurrentUser(user);
            getBicycle(id);
            getAllCategories();
        }
    }, [id]);

    const getBicycle = (id) => {
        bicycleService.getBicycleById(id)
            .then(response => {
                setCurrentEditBicycle(response);
                setSelectedCategory(response.category.id);
                setImagePreview(response.bicycleImage);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const getAllCategories = () => {
        bicycleService.getAllCategories()
            .then(response => {
                setCategories(response);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);

        bicycleService.getImageByName(file.name)
            .then(imageName => {
                setImagePreview(imageName.request.responseURL);

                if (imagePreview) {
                    setCurrentEditBicycle(prevState => ({
                        ...prevState,
                        bicycleImage: imageName.request.responseURL
                    }));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            handleChangeCategory(e);
        } else {
            setCurrentEditBicycle(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleChangeCategory = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        setCurrentEditBicycle(prevState => ({
            ...prevState,
            category: { id: selectedCategoryId }
        }));
    };

    const handleEdit = () => {
        setEditable(prevState => !prevState);
        setMessage(null);
        setErrorMessage(null);
    }

    const handleUpdateBicycle = () => {
        const { id, ...bicycleData } = currentEditBicycle;



        bicycleService.updateBicycle(id, bicycleData)
            .then(updatedBicycle => {
                setEditable(false);
                setMessage("Bicicleta actualizada exitosamente!");
                setErrorMessage(null);
            })
            .catch(error => {
                console.error("Error al actualizar la Bicicleta:", error);
                setErrorMessage("Error al actualizar la Bicicleta. Inténtalo de nuevo.");
                setMessage(null);
            });
    }

    return (
        <>
            <div className="dash-board-bicycles-admin-container">
                <div className="admin-dashboard-main-container">
                    <div className="admin-dashboard-main-dash-board-main-admin">
                        <Header currentUser={currentUser} />
                        <div className="admin-dashboard-main-containerdashboardadmin">
                            <div className="admin-dashboard-main-containerdashboardsections">
                                <SidebarsectionAdmin />

                                <div className="dash-board-bicycles-admin-containermainsection">
                                    <div className="dash-board-bicycles-admin-containermainsectiontitle">
                                        <div className="dash-board-bicycles-admin-containersectiontitle">
                                            <span className="dash-board-bicycles-admin-text">
                                                <span>Gestión de Bicicleta</span>
                                            </span>
                                        </div>
                                    </div>
                                    <Form className="dash-board-bicycles-admin-containermainsectioneditprofile">
                                        <div className="dash-board-bicycles-admin-containermainsectionshield">
                                            <EditFormInput
                                                label="Marca"
                                                type="text"
                                                placeholder={currentEditBicycle.brandModel}
                                                name="brandModel"
                                                value={currentEditBicycle.brandModel}
                                                onChange={onChange}
                                                disabled={editable}
                                                validations={[required, vusername]}
                                            />
                                        </div>
                                        <div className="dash-board-bicycles-admin-containermainsectionselect">
                                            <SelectFormInput
                                                label="Selecciona una categoría:"
                                                name="category"
                                                value={selectedCategory}
                                                onChange={handleChangeCategory}
                                                disabled={false}
                                                categories={categories}
                                            />
                                        </div>
                                        <div className="dash-board-bicycles-admin-containermainsectionshield1">
                                            <TextAreaFormInput
                                                label="Descripcion"
                                                placeholder={currentEditBicycle.description}
                                                name="description"
                                                value={currentEditBicycle.description}
                                                onChange={onChange}
                                                disabled={editable}
                                                validations={[required, vusername]}
                                            />
                                        </div>
                                        <div className="dash-board-bicycles-admin-containermainsectionshield2">
                                            <EditFormInput
                                                label="Precio"
                                                type="number"
                                                placeholder={String(currentEditBicycle.rentalPrice)}
                                                name="rentalPrice"
                                                value={currentEditBicycle.rentalPrice}
                                                onChange={onChange}
                                                disabled={editable}
                                                validations={[required, vusername]}
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
                                                                onChange={handleImageChange} ç
                                                                disabled
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
                                                            src={currentEditBicycle.bicycleImage || "https://play.teleporthq.io/static/svg/default-img.svg"}
                                                            alt="Bicycle"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                    <div className="dash-board-bicycles-admin-containermainsectionbuttoms">
                                        <FormButton onClick={handleEdit}>Editar</FormButton>
                                        <FormButton onClick={handleUpdateBicycle}>Guardar</FormButton>
                                        {message && (
                                            <div className="form-group">
                                                <div className="edit-containermessage-message">
                                                    {message}
                                                </div>
                                            </div>
                                        )}
                                        {errorMessage && (
                                            <div className="form-group">
                                                <div className="edit-containererror-message">
                                                    {errorMessage}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default DashBoardEditBicycleAdmin;
