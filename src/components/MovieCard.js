import { Card } from "antd";
const { Meta } = Card;
export function MovieCard({ movie }) {
  return (
    <Card
      hoverable
      style={{ width: 350 }}
      cover={<img alt={movie.Title} src={movie.Poster} />}
    >
      <Meta title={movie.Title} />
    </Card>
  );
}
