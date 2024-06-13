import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../components/common/layout/header/header';
import Footer from '../../../components/common/layout/footer/footer';
import authService from '../../../services/auth/auth.service';
import Form from "react-validation/build/form";
import './viewPostUser.css';
import BicycleService from '../../../services/bicycle/bicycle.service';
import PostService from '../../../services/post/post.service';
import RentalService from '../../../services/rental/rental.service';
import Utils from '../../../common/utils';
import AddFormInput from '../../../components/UI/inputs/AddFormInput/addFormInput';
import FormButton from '../../../components/UI/Button/FormButton/formButton';
import ModalConfirm from '../../../components/UI/Modal/ModalConfirm/modalConfirm';

const ViewPostUser = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [bicycle, setBicycle] = useState({});
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [isRentalCreated, setIsRentalCreated] = useState(false);
  const [newRental, setNewRental] = useState({
    rentedBicycle: {},
    landlord: { id: null },
    tenant: { id: null },
    startDate: "",
    endDate: ""
  });
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadBicycleAndPostData(id);
    }
  }, [id]);

  useEffect(() => {
    if (post.owner && newRental.startDate === "" && newRental.endDate === "") {
      setNewRental(prevState => ({
        ...prevState,
        landlord: { id: post.owner.id },
        tenant: { id: currentUser?.id },
        rentedBicycle: bicycle,
        startDate: "",
        endDate: ""
      }));
    }
  }, [post, bicycle, currentUser, newRental]);

  const loadBicycleAndPostData = (postId) => {
    Promise.all([
      BicycleService.getBicycleByPostId(postId),
      PostService.getPostById(postId)

    ]).then(([bicycleData, postData]) => {
      setBicycle(bicycleData);
      setPost(postData);
      setTags(postData.tags || []);
    }).catch(error => {
      console.error("Error loading data:", error);
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewRental(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleToggleModalConfirm = () => {
    setShowModalConfirm(!showModalConfirm);
  };

  const handleCreateRental = () => {
    const rentalData = {
      rentedBicycle: bicycle,
      landlord: { id: post.owner.id },
      tenant: { id: currentUser?.id },
      startDate: newRental.startDate,
      endDate: newRental.endDate
    };

    RentalService.reserveBicycle(rentalData)
      .then(response => {
        setErrorMessage(null);
        setIsRentalCreated(true);
        setShowModalConfirm(true);
      })
      .catch(error => {
        setErrorMessage("Error al crear la reserva. Inténtalo de nuevo. " + error);
      });
  };

  return (
    <div className="view-post-user-container">
      <div className="view-post-user-view-post-user">
        <Header currentUser={currentUser} />
        <div className="view-post-user-containerdashboardadmin">
          <div className="view-post-user-containerdashboardsections">
            <div className="view-post-user-containerpostsectionmain">
              <div className="view-post-user-containerpostsectiontitle">
                <div className="view-post-user-containercatalogtitle">
                  <span className="view-post-user-text">
                    <span>{post.postName}</span>
                  </span>
                </div>
              </div>
              <div className="view-post-user-containerpostsectionimg">
                <div className="view-post-user-containerimg">
                  <img src={bicycle.bicycleImage} className="view-post-user-img" alt="Bicycle" />
                </div>
                <div className="view-post-user-containerpostsectiondetails">
                  <div className="view-post-user-containerpostdetailstitle">
                    <span className="view-post-user-text02">
                      <span>Detalles</span>
                    </span>
                  </div>
                  <div className="view-post-user-containerpostdetailssections">
                    <div className="view-post-user-containerdetails">
                      <div className="view-post-user-containerdetail">
                        <div className="view-post-user-containerdetailtitle">
                          <span className="view-post-user-text04">
                            <span>Modelo</span>
                          </span>
                        </div>
                        <div className="view-post-user-containerdetailtext">
                          <span className="view-post-user-text06">
                            <span>{bicycle.brandModel}</span>
                          </span>
                        </div>
                      </div>
                      <div className="view-post-user-containerdetail1">
                        <div className="view-post-user-containerdetailtitle1">
                          <span className="view-post-user-text08">
                            <span>Categoria</span>
                          </span>
                        </div>
                        <div className="view-post-user-containerdetailtext1">
                          <span className="view-post-user-text10">
                            <span>{Utils.capitalize(bicycle.category?.categoryName)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="view-post-user-containerdetail2">
                        <div className="view-post-user-containerdetailtitle2">
                          <span className="view-post-user-text12">
                            <span>Disponible</span>
                          </span>
                        </div>
                        <div className="view-post-user-containerdetailtext2">
                          <span className="view-post-user-text14">
                            <span>{post.postStatus === "DISPONIBLE" ? "Si" : "No"}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="view-post-user-containersectionprice">
                    <div className="view-post-user-buttomtextprice">
                      <span className="view-post-user-text16">
                        <span>{bicycle.rentalPrice} € / Hora</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="view-post-user-containerpostsectiontags">
                {tags.map((tag, index) => (
                  <div key={index} className="view-post-user-containersectiontag">
                    <div className="view-post-user-containertagtext">
                      <span className="view-post-user-text18">
                        <span>{tag.tagName}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-post-user-containerpostsectiondescription">
                <div className="view-post-user-containerpostdescriptiontitle">
                  <span className="view-post-user-text22">
                    <span>Descripción</span>
                  </span>
                </div>
                <div className="view-post-user-containerpostdescriptiontextarea">
                  <span className="view-post-user-text24">
                    <span>{post.description}</span>
                  </span>
                </div>
              </div>
              <div className="view-post-user-containerpostsectionform">
                <Form className="view-post-user-containerpostfrominputs">
                  <div className="view-post-user-containersectioninput">
                    <AddFormInput
                      label="Fecha de Inicio"
                      type="date"
                      name="startDate"
                      value={newRental.startDate}
                      onChange={onChange}
                      validations={[]}
                      placeholder="Selecciona la Fecha de Inicio"
                      disabled={false}
                    />
                  </div>
                  <div className="view-post-user-containersectioninput1">
                    <AddFormInput
                      label="Fecha Fin"
                      type="date"
                      name="endDate"
                      value={newRental.endDate}
                      onChange={onChange}
                      validations={[]}
                      placeholder="Selecciona la Fecha Fin"
                      disabled={false}
                    />
                  </div>
                </Form>

                <div className="view-post-user-containerpostsectionbuttoms">
                  <FormButton textColor="#FFFFFF" color="#121417" onClick={handleGoBack}>Atrás</FormButton>
                  {errorMessage && <div className="form-group">
                    <div className="edit-containererror-message">
                      {errorMessage}
                    </div>
                  </div>}
                  {!isRentalCreated && (
                    <FormButton
                      textColor="#FFFFFF"
                      color="#121417"
                      onClick={handleCreateRental}
                      disabled={post.postStatus !== "DISPONIBLE"}
                    >
                      Reservar
                    </FormButton>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {isRentalCreated && (
        <ModalConfirm
          title={"Reserva Realizada"}
          body={"Has reservado la bicicleta, en unos minutos se te enviará una notificación de que la reserva será confirmada"}
          show={showModalConfirm} // Cambia toggleModalConfirm por showModalConfirm
          onClose={handleToggleModalConfirm} // Añade esta prop para cerrar el modal
          onConfirm={"/publicaciones"}
        />
      )}
    </div>
  );
}

export default ViewPostUser;