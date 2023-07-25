import { Paper, Button } from "@mui/material";

export default function CarouselItem(props) {
  return (
    <Paper>
      <img src={props.item.img} alt="image" style={{width: "100%"}}/>
    </Paper>
  );
}
