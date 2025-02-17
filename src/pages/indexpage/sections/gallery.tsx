import { Card, CardBody, Image } from "@heroui/react";

import guitar from "../../../assets/images/1728656699454.jpg";
import loml from "../../../assets/images/loml.jpg";

const Gallery = () => {
  const list = [
    {
      title: "Raspberry",
      img: loml,
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: 'https://picsum.photos/id/1005/200/200',
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: guitar,
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: 'https://picsum.photos/id/1003/200/200',
      price: "$8.00",
    },
    {
      title: "Banana",
      img: 'https://picsum.photos/id/1002/200/200',
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: 'https://picsum.photos/id/1001/200/200',
      price: "$12.20",
    },
  ];


  return (
    <div className="w-full place-items-center gap-10 grid [@media(max-width:450px)]:grid-cols-1 max-md:grid-cols-2 md:grid-cols-4">
      {list.map((item, index) => (
        /* eslint-disable no-console */
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => console.log("item pressed")}
          className="w-full h-full max-w-[300px] aspect-square "
        >
          <CardBody className="overflow-hidden w-full h-full max-w-full max-h-full p-0 flex items-center justify-center">
            <Image
              alt={item.title}
              className="object-cover w-max h-max max-h-full max-w-full"
              radius="sm"
              shadow="sm"
              src={item.img}
            />
          </CardBody>
          {/* <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter> */}
        </Card>
      ))}

      {/* <img src={guitar} alt="guitar" /> */}
    </div>
  );
};

export default Gallery;
