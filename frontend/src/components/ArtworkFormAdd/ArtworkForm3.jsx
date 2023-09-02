import React, { useContext } from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import { FormArtworkArtistContext } from "../../context/FormArtworkArtistContext";

function ArtworkForm3({
  modalRef,
  prevStep,
  nextStep,
  dataTechnique,
  dataArtTrend,
}) {
  const {
    artTrend,
    technique,
    formArtist,
    formTechnique,
    formArtTrend,
    handleInputChangeArtist,
  } = useContext(FormArtworkArtistContext);

  return (
    <div
      ref={modalRef}
      className="h-full flex flex-col justify-between items-center"
    >
      <div>
        <h2 className="font-semibold text-[20px]">
          Information relative à l'artiste
        </h2>
      </div>
      <div className="text-[16px] lg:flex flex-col lg:justify-between">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <label htmlFor="lastname_artist" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'artiste *</h3>
            <div>
              <Input
                type="text"
                id="lastname_artist"
                name="lastname"
                placeholder="Nom"
                onChange={handleInputChangeArtist}
                value={formArtist.lastname}
                maxLength={45}
              />
              {45 - formArtist.lastname.length <= 10 ? (
                <span
                  className={
                    45 - formArtist.lastname.length === 0 ? "text-red-500" : ""
                  }
                >
                  {45 - formArtist.lastname.length} caractères restants
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="firstname_artist" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Prénom de l'artiste *</h3>
            <div>
              <Input
                type="text"
                id="firstname_artist"
                name="firstname"
                placeholder="Prénom"
                onChange={handleInputChangeArtist}
                value={formArtist.firstname}
                maxLength={45}
              />
              {45 - formArtist.firstname.length <= 10 ? (
                <span
                  className={
                    45 - formArtist.firstname.length === 0 ? "text-red-500" : ""
                  }
                >
                  {45 - formArtist.firstname.length} caractères restants
                </span>
              ) : null}
            </div>
          </label>
          <div className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom d'usage</h3>
            <div>
              <p className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]">
                {formArtist.nickname}
              </p>
            </div>
          </div>
        </div>
        <label htmlFor="artist_decription" className="w-[100%]">
          <h3 className="py-4 text-[14px]">Description</h3>
          <div>
            <textarea
              id="artist_description"
              name="description"
              placeholder="Description"
              onChange={handleInputChangeArtist}
              value={formArtist.description}
              className="border border-gray-300 rounded-[4px] p-1 w-[100%] resize-none outline-none overflow-x-hidden"
              maxLength={1000}
            />
            {1000 - formArtist.websiteUrl.length <= 100 ? (
              <span
                className={
                  1000 - formArtist.websiteUrl.length === 0
                    ? "text-red-500"
                    : ""
                }
              >
                {1000 - formArtist.websiteUrl.length} caractères restants
              </span>
            ) : null}
          </div>
        </label>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <div className="w-[100%]">
            <h3 className="py-4 text-[14px]">Techniques</h3>
            <div>
              <p className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]">
                {formTechnique.name
                  ? formTechnique.name
                  : dataTechnique[technique - 1].name}
              </p>
            </div>
          </div>
          <div className="w-[100%]">
            <h3 className="py-4 text-[14px]">Courant Artistique</h3>
            <div>
              <p className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]">
                {formArtTrend.name
                  ? formArtTrend.name
                  : dataArtTrend[artTrend - 1].name}
              </p>
            </div>
          </div>
          <label htmlFor="web_site" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien site internet</h3>
            <div>
              <Input
                type="url"
                id="web_site"
                name="websiteUrl"
                placeholder="Lien site internet"
                onChange={handleInputChangeArtist}
                value={formArtist.websiteUrl}
                maxLength={255}
              />
              {formArtist.websiteUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.websiteUrl
                ) && <span className="text-red-500">URL invalide</span>}
              {255 - formArtist.websiteUrl.length <= 50 ? (
                <span
                  className={
                    255 - formArtist.websiteUrl.length === 0
                      ? "text-red-500"
                      : ""
                  }
                >
                  {255 - formArtist.websiteUrl.length} caractères restants
                </span>
              ) : null}
            </div>
          </label>
        </div>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <label htmlFor="facebook" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Facebook</h3>
            <div>
              <Input
                type="url"
                id="facebook"
                name="facebookUrl"
                placeholder="Facebook"
                onChange={handleInputChangeArtist}
                value={formArtist.facebookUrl}
                maxLength={255}
              />
              {formArtist.facebookUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.facebookUrl
                ) && <span className="text-red-500">URL invalide</span>}
              {255 - formArtist.facebookUrl.length <= 50 ? (
                <span
                  className={
                    255 - formArtist.facebookUrl.length === 0
                      ? "text-red-500"
                      : ""
                  }
                >
                  {255 - formArtist.facebookUrl.length} caractères restants
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="twitter" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Twitter</h3>
            <div>
              <Input
                type="url"
                id="twitter"
                name="twitterUrl"
                placeholder="Twitter"
                onChange={handleInputChangeArtist}
                value={formArtist.twitterUrl}
                maxLength={255}
              />
              {formArtist.twitterUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.twitterUrl
                ) && <span className="text-red-500">URL invalide</span>}
              {255 - formArtist.twitterUrl.length <= 50 ? (
                <span
                  className={
                    255 - formArtist.twitterUrl.length === 0
                      ? "text-red-500"
                      : ""
                  }
                >
                  {255 - formArtist.twitterUrl.length} caractères restants
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="instagram" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Instagram</h3>
            <div>
              <Input
                type="url"
                id="instagram"
                name="instagramUrl"
                placeholder="Instagram"
                onChange={handleInputChangeArtist}
                value={formArtist.instagramUrl}
                maxLength={255}
              />
              {formArtist.instagramUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.instagramUrl
                ) && <span className="text-red-500">URL invalide</span>}
              {255 - formArtist.instagramUrl.length <= 50 ? (
                <span
                  className={
                    255 - formArtist.instagramUrl.length === 0
                      ? "text-red-500"
                      : ""
                  }
                >
                  {255 - formArtist.instagramUrl.length} caractères restants
                </span>
              ) : null}
            </div>
          </label>
        </div>
      </div>
      {!formArtist.firstname || !formArtist.lastname ? (
        <p className="text-red-500 text-center">
          Les champs suivis d'un * sont obligatoires.
        </p>
      ) : null}
      <div className="flex justify-between py-4 lg:justify-around ">
        <div className="px-[10px] w-[150px] h-[30px] lg:w-[200px]">
          <GreyButton text="Précédent" onClick={prevStep} />
        </div>
        <div className="px-[10px] w-[150px] h-[30px] lg:w-[200px]">
          <RedButton
            text="Suivant"
            onClick={nextStep}
            disabled={
              !formArtist.firstname ||
              !formArtist.lastname ||
              (formArtist.websiteUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.websiteUrl
                )) ||
              (formArtist.facebookUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.facebookUrl
                )) ||
              (formArtist.twitterUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.twitterUrl
                )) ||
              (formArtist.instagramUrl &&
                !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
                  formArtist.instagramUrl
                ))
            }
          />
        </div>
      </div>
    </div>
  );
}

ArtworkForm3.propTypes = {
  modalRef: PropTypes.shape(),
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
  dataTechnique: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  dataArtTrend: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

ArtworkForm3.defaultProps = {
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
  dataTechnique: {
    name: "",
  },
  dataArtTrend: {
    name: "",
  },
};

export default ArtworkForm3;
