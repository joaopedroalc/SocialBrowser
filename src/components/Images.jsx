import { Image } from "antd";
import "antd/dist/antd.css"; // se der erro remove esse css

export function Images({ img }) {
  return (
    <Image.PreviewGroup>
      <Image
        src={
          img !== ""
            ? img
            : "https://forum.bubble.io/uploads/default/original/3X/1/2/12e944afd917d123319c9074a7e72581785a3b38.png"
        }
        width={300}
        height={300}
        style={{ objectFit: "cover" }}
      />
    </Image.PreviewGroup>
  );
}
