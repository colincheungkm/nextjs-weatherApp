import spinner from '../../public/spinner.gif';

const Spinner = () => {
  return (
    <>
      <Image className="w-[200px]" src={spinner} alt="Loading..." />
    </>
  );
};

export default Spinner;
