import { Image } from "antd";
import "antd/dist/antd.css"; // se der erro remove esse css

export function Images({ img }) {
  return (
    <Image.PreviewGroup>
      <Image src={img} width={300} />
    </Image.PreviewGroup>
  );
}
