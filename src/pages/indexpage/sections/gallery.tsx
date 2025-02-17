import { Card, CardBody, CardFooter, Image } from "@heroui/react";

const Gallery = () => {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="w-full place-items-center gap-10 grid [@media(max-width:450px)]:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3">
      {list.map((item, index) => (
        /* eslint-disable no-console */
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => console.log("item pressed")}
          className="w-full h-full max-w-[350px] aspect-square"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="object-cover w-[350px] h-[350px]"
              radius="sm"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          {/* <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
};

export default Gallery;
