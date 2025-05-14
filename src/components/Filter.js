/*
   компонент, для фильтрации таблицы
*/

import React, { useState } from 'react';

const Filter = (props) => {
    const [formData, setFormData] = useState({
        city: '',
        continent: '',
        country: '',
        populationFrom: '',
        populationTo: '',
        squareFrom: '',
        squareTo: '',
        populationDensityFrom: '',
        populationDensityTo: ''
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // создаем словарь со значениями полей формы
        const filterField = {
            "Город": formData.city.toLowerCase(),
            "Континент": formData.continent.toLowerCase(),
            "Страна": formData.country.toLowerCase(),
            "Население": [parseFloat(formData.populationFrom), parseFloat(formData.populationTo)],
            "Площадь": [parseFloat(formData.squareFrom), parseFloat(formData.squareTo)],
            "Плотность населения": [parseFloat(formData.populationDensityFrom), parseFloat(formData.populationDensityTo)]
        };

        // фильтруем данные по значениям всех полей формы
        let arr = props.data;
        for (const key in filterField) {
            if (!Array.isArray(filterField[key])) {
                arr = arr.filter(item =>
                    item[key].toLowerCase().includes(filterField[key]));
            } else {
                arr = arr.filter(item => {
                    return parseFloat(item[key]) >=
                        (isNaN(filterField[key][0]) ? 0 : filterField[key][0]) &&
                        parseFloat(item[key]) <=
                        (isNaN(filterField[key][1]) ? Infinity : filterField[key][1]);
                });
            }
        }
  
        // передаем родительскому компоненту новое состояние - отфильтрованный массив
            //        if(arr != null)
        //if(arr.length != 0 )
            props.filtering(arr);
    };

    const clear = (event) => {
        event.preventDefault();
        
        // Сбрасываем состояние формы
        setFormData({
            city: '',
            continent: '',
            country: '',
            populationFrom: '',
            populationTo: '',
            squareFrom: '',
            squareTo: '',
            populationDensityFrom: '',
            populationDensityTo: ''
        });
        
        // Вызываем фильтрацию с пустыми значениями, если нужно
       
        props.filtering(props.fullData);
    };

    return (
      <form onSubmit={handleSubmit} onReset={clear}>
          <p>
              <label htmlFor="city">Город:</label>
              <input type="text" id="city" value={formData.city} onChange={handleChange} />
          </p>
          <p>
              <label htmlFor="continent">Континент:</label>
              <input type="text" id="continent" value={formData.continent} onChange={handleChange} />
          </p>
          <p>
              <label htmlFor="country">Страна:</label>
              <input type="text" id="country" value={formData.country} onChange={handleChange} />
          </p>
          <p>
              <label htmlFor="populationFrom">Население:</label>
              от <input type="number" id="populationFrom" value={formData.populationFrom} onChange={handleChange} />
              до <input type="number" id="populationTo" value={formData.populationTo} onChange={handleChange} />
          </p>
          <p>
              <label htmlFor="squareFrom">Площадь:</label>
              от <input type="number" id="squareFrom" value={formData.squareFrom} onChange={handleChange} />
              до <input type="number" id="squareTo" value={formData.squareTo} onChange={handleChange} />
          </p>
          <p>
              <label htmlFor="populationDensityFrom">Плотность населения:</label>
              от <input type="number" id="populationDensityFrom" value={formData.populationDensityFrom} onChange={handleChange} />
              до <input type="number" id="populationDensityTo" value={formData.populationDensityTo} onChange={handleChange} />
          </p>
          <p>         
              <button type="submit">Фильтровать</button>   
              <button type="reset">Очистить фильтр</button>
          </p>  
      </form> 
    );
};

export default Filter;