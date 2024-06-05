import './Preloader.css';

function Preloader({ nothingFound = false, seacrhError = false }) {
  return (
    <div className='preloader'>
      {!nothingFound && <div className='circle-preloader'></div>}
      {nothingFound && (
        <div className='preloader__nothingfound'>Nothing found.</div>
      )}
      {seacrhError && (
        <div className='preloader__searcherror'>
          Sorry, something went wrong during the request.
          <br />
          There may be a connection issue or the server may be down.
          <br /> Please try again later.
        </div>
      )}
    </div>
  );
}

export default Preloader;
