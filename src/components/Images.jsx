import { Image } from "antd";
import "antd/dist/antd.css"; // se der erro remove esse css

export function Images({ img }) {
  return (
    <Image.PreviewGroup>
      <Image
        src={img}
        width={300}
        height={300}
        style={{ objectFit: "cover" }}
      />
    </Image.PreviewGroup>
  );
}
