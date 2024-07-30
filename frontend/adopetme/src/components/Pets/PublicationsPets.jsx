import React, { useEffect, useState } from "react";
import { useSearch } from "../../contexts/SearchContext"; // Importar el contexto

//Material Ui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

//Icons Material Ui
import StorageIcon from "@mui/icons-material/Storage";

//Components
import CardsPets from "./CardsPets";
import ModalAdopt from "./ModalAdopt";

//Util
import converterBase64ToUrl from "../../utils/converterBase64ToUrl";

//imgs
import NoPhoto from "../../assets/img/nophoto.png";

//Share
import Loading from "../shared/Loading";

const PublicationsPets = () => {
  //*****************************************************USE STATE**************************************************************** */
  const [pets, setPets] = useState([]);
  const [imgPets, setImgPets] = useState([]);

  const [openModalAdopt, setOpenModalAdopt] = useState(false);
  const [idPets, setIdPets] = useState();

  const [loading, setLoading] = useState();
  const [loadingImg, setLoadingImg] = useState();

  const [allPets, setAllPets] = useState();
  const [page, setPage] = React.useState(1);
  const [count, setCount] = useState();
  const [numberItems] = useState(12);

  const { filteredPets, loading: loadingSearch } = useSearch(); // Obtener mascotas filtradas del contexto

  //*****************************************************USE EFFECT**************************************************************** */
  useEffect(() => {
    setLoading(true);
    const getPets = async () => {
      const response = await fetch("https://service01.mercelab.com/pet");
      const result = await response.json();
      console.log("result", result);
      setLoading(false);
      //Pagination(result.data);
      setAllPets(result.data);
      //const resultSlice = result.data.slice(startIndex, endIndex);
      //setPets(result.data);
    };
    getPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getPets = async () => {
      setLoadingImg(true);
      const response = await fetch("https://service02.mercelab.com/image");
      const result = await response.json();
      setLoadingImg(false);
      //const resultSlice = result.data.slice(0, 6);
      setImgPets(result.data);
    };
    getPets();
  }, []);

  useEffect(() => {
    if (pets.length > 0 && imgPets.length > 0) {
      const newPets = pets.map((pet) => ({
        ...pet,
        ...imgPets.find((item) => item.idPet === pet.idPet),
      }));

      setPets(newPets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgPets, page]);

  // useEffect(() => {
  //   if (filteredPets) {
  //     console.log("result search", filteredPets);
  //     const pages = Math.ceil(filteredPets.length / numberItems);
  //     setCount(pages);
  //     const data = filteredPets.slice(
  //       (page - 1) * numberItems,
  //       page * numberItems
  //     );
  //     setPets(data);
  //   }
  // }, [filteredPets, page]);

  //***************************************************** FUNCTIONS**************************************************************** */

  const handleClickAdopt = (id) => {
    setOpenModalAdopt(true);
    setIdPets(id);
  };

  const handleClodeModalAdopt = () => {
    setOpenModalAdopt(false);
  };

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  return (
    <Box marginY={4}>
      <Typography
        variant="h4"
        fontWeight="fontWeightBold"
        sx={{
          color: "white",
          textAlign: "center",
          textTransform: "uppercase",
        }}
        gutterBottom
      >
        Mascotas en adopción
      </Typography>

      <Stack
        spacing={{
          xs: 1,
          sm: 4,
        }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        width="90%"
        mx="auto"
        sx={{ mt: 4 }}
      >
        {pets.length > 0 ? (
          pets.map((pet) => {
            return (
              <CardsPets
                key={pet.idPet}
                id={pet.idPet}
                img={
                  pet.imagePet ? converterBase64ToUrl(pet.imagePet) : NoPhoto
                }
                name={pet.name}
                gender={pet.gender === 0 ? "Macho" : "Hembra"}
                ubication={"ubicacion"}
                handleClickAdopt={handleClickAdopt}
                loading={loading}
                loadingImg={loadingImg}
              />
            );
          })
        ) : (
          <Stack alignItems={"center"}>
            <StorageIcon color="secondary" sx={{ fontSize: 100 }} />
            <Typography textAlign={"center"} color={"secondary"} variant="h6">
              Sin resultados
            </Typography>
          </Stack>
        )}
      </Stack>

      <Stack alignItems={"center"} mt={4}>
        <Pagination
          count={count}
          page={page}
          //variant="outlined"
          color="secondary"
          onChange={handleChangePagination}
        />
      </Stack>

      {idPets && (
        <ModalAdopt
          open={openModalAdopt}
          handleCloseModal={handleClodeModalAdopt}
          id={idPets}
        />
      )}

      <Loading open={loadingSearch} />
    </Box>
  );
};

export default PublicationsPets;
