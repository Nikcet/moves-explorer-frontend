import React from 'react';


function More(props) {
  function handleClickMore(event) {
    props.setNewCards();
  }
  
  return (
    <section className="more">
      <input type="button" value="Ещё" className="more__button" onClick={handleClickMore} />
    </section>
  );
}

export default More;