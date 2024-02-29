

const ExerciseCategory = ({ exercise }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpenModal = () => {
//     console.log("yes")
//     setIsOpen(true);
//   };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2" >
      <div className="h-full flex justify-center items-center">
        <div
          className="bg-slate-900 text-white w-full h-full p-4 rounded-md cursor-pointer"
        //   onClick={handleOpenModal}
        >
          <h3 className="text-lg font-semibold mb-2">{exercise}</h3>
          <p className="text-sm text-gray-300">Click to add set & reps</p>
        </div>
      </div>
      {/* {isOpen && <InputModal exercise={exercise} onClose={() => setIsOpen(false)} />} */}
    </div>
  );
};

export default ExerciseCategory;
