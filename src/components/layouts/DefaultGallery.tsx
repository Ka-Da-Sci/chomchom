import {
  Card,
  CardBody,
  Image,
  Button,
  Spinner,
  Pagination,
} from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGalleryFooter from "@/hooks/useGalleryFooter";
import useFileManagementContext from "@/hooks/useFileManagementContext";

type Item = {
  id: string | number | null;
  title: string;
  path: string;
  user_fullnames: string;
  user_name: string;
  created_at: string;
};


const DefaultGallery = ({ items }: { items: Item[] }) => {
  const { pathname } = useLocation();
  const { isLoading, setIsLoading, contextLoaded } = useFileManagementContext();
  const [currentPage, setCurrentPage] = useState(1);
  const { CompatibleFooter } = useGalleryFooter();
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const itemsPerPage = 6;

  useEffect(() => {
    setTotalPages(Math.ceil(items.length / itemsPerPage));
  }, [items, itemsPerPage]);

  useEffect(() => {
    setIsLoading(true);

    if (contextLoaded) {
      setIsLoading(false);
    }
  }, [contextLoaded]);

  // Get items for the current page
  let currentItems: {
    id: number | string | null;
    title: string;
    path: string;
  }[] =
    totalPages === 1
      ? items
      : items.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
  // if (items.length !== 0 && currentItems?.length === 0) {
  //   currentItems =
  //     totalPages === 1
  //       ? items
  //       : items.slice(
  //           (currentPage - 1) * itemsPerPage,
  //           currentPage * itemsPerPage
  //         );
  // }

  // Show loading state while waiting for data (Using HeroUI Spinner)
  if (isLoading || !contextLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
    );
  }
  /* eslint-disable no-console */
  console.log(pathname, items);

  return (
    <div className="container mx-auto ">
      <div className="w-full place-items-center gap-10 grid [@media(max-width:450px)]:grid-cols-1 custom-grid-col2-500-min md:grid-cols-3">
        {currentItems.map((item, index) => (
          <Card key={index} shadow="sm" className="w-full h-full">
            <Card
              as={Button}
              onPress={() => {
                navigate(`/image/${item.id}`);
              }}
              isPressable
              className="overflow-hidden w-full h-full max-w-full max-h-full p-4 rounded-none flex items-center justify-normal"
            >
              <CardBody className="overflow-hidden p-0 w-full h-full max-w-full max-h-full items-center justify-normal">
                <Image
                  alt={item && item.title ? item.title : "image"}
                  className="object-cover object-right-top w-full h-full max-h-[400px]"
                  src={item.path}
                />
              </CardBody>
            </Card>
            <CompatibleFooter item={{ ...item }} />
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {totalPages !== 1 && (
          <Pagination
            total={totalPages}
            page={currentPage}
            // onChange={(page) => setCurrentPage(page)}
            className="gap-2"
            renderItem={({ page, isActive }) => (
              <span
                key={page}
                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
                    ${isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}
                    hover:bg-blue-400 transition-all`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default DefaultGallery;
