import InfoBlock from "./InfoBlock";
import ContentBock from "./ContentBock";
import ButtonsBlock from "./ButtonsBlock";
import Box from "@mui/material/Box";

export default function MyCard(props) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        color: "#898989",
      }}
    >
      <InfoBlock
        username={props.data.username}
        created={props.data.createdAt}
        product_id={props.data.product_id}
        rating={props.data.user_rating}
      />
      <ContentBock
        id={props.data._id}
        text={props.data.text}
        title={props.data.title}
        tags={props.data.tags}
        images={props.data.images}
      />
      <ButtonsBlock
        likes={props.data.likes}
        comments={props.data.comments}
        id={props.data._id}
      />
    </Box>
  );
}
