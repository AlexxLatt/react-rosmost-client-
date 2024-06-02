import React, { Component } from 'react';
import './Filter.scss';
import iconSearch from "../../../icons/InputSearch.png";
import iconUser from "../../../icons/user.png";
import iconBasket from "../../../icons/cart.png";
import iconProfile from "../../../icons/profile.png";
import iconPurshase from "../../../icons/coin.png";
import iconLogout from "../../../icons/logout.png";
import makeAnimated from 'react-select/animated';
import Select from "react-select";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      country: '',
      isDropdownOpen: false // Добавляем состояние для отслеживания состояния выпадающего списка
    };
  }

  onUpdateSearch = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onUpdateSearch(term);
  }

  onUpdateFilter = (selectedOption) => {
    const country = selectedOption && selectedOption.label !== 'All' ? selectedOption.label : '';
    this.setState({ country });
    this.props.onUpdateFilter(country);
  }

  // Метод для переключения состояния выпадающего списка
  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen
    }));
  }

  render() {
    const { isDropdownOpen } = this.state; // Достаем состояние из state
    const animatedComponents = makeAnimated();
    const options = [
      { value: 'Usa', label: 'Usa' },
      { value: 'Russia', label: 'Russia' },
      { value: 'Brazil', label: 'Brazil' },
      { value: 'Canada', label: 'Canada' },
      { value: 'South Korea', label: 'South Korea' },
      { value: 'India', label: 'India' },
      { value: 'All', label: 'All' }
    ];
    const username = localStorage.getItem('username');

    return (
      <div className="Filter">
        <div className="container">
          <div className="Filter__mainWrapper">
            <div className="Filter__mainWrapper__inputWrapper">
              <img src={iconSearch} alt="упс.." className="Filter__mainWrapper__inputWrapper__iconSearch" />
              <input
                onChange={this.onUpdateSearch}
                type="text"
                name='inputFilter'
                className='Filter__mainWrapper__inputWrapper__input'
                placeholder='Поиск по имени'
              />
            </div>
            <div className="Filter__mainWrapper__buttonWrapper">
              <div className="Filter__mainWrapper__buttonWrapper__label">Фильтр:</div>
              <Select
                components={animatedComponents}
                options={options}
                placeholder={'Country'}
                onChange={this.onUpdateFilter}
                className='Filter__mainWrapper__buttonWrapper__item'
              />
            </div>
            <div className="Filter__mainWrapper__profileWrapper">
              <div className="Filter__mainWrapper__profileWrapper__clickArea" onClick={this.toggleDropdown}>
                <span className='Filter__mainWrapper__profileWrapper__clickArea__name'>{username} ⮟ </span>
                <img className='Filter__mainWrapper__profileWrapper__clickArea__img' src={iconUser} alt="упс" />
              </div>
              {/* Отображение выпадающего списка при открытии */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li className="dropdown-menu__item"><img src={iconBasket} alt="упс..." /><div>Корзина</div></li>
                    <li className="dropdown-menu__item"><img src={iconProfile} alt="упс..." /><div>Профиль</div></li>
                    <li className="dropdown-menu__item"><img src={iconPurshase} alt="упс..." /><div>Покупки</div></li>
                    <li className="dropdown-menu__item"><img src={iconLogout} alt="упс..." /><div>Выход</div></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
