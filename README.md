<h1 align="center">Pinterest clone</h1>
<h2 align="center">

[![Mentioned in Awesome Vue.js](https://awesome.re/mentioned-badge.svg)](https://github.com/vuejs/awesome-vue)

</h2>

<img src="../images/pinterest-logo.png" width="100%">

## Описание

**О проекте**

Pinterest clone реализован с нуля на vanilla JavaScript исключительно в учебных целях в рамках курса **frontend developer, TeachMeSkills** Реализован локальный сервер, а так же база данных на основе MongoDB. Для стилизации использован препроцессор SCSS, использована библиотека massonry.

## Наши функции:
### Основной вид:

- **HEADER:** Функция поиска карточек по описанию: в поле ввода необходимо ввести искомый ключ и нажать клавишу "Enter", если введён неверный ключ, можно очистить строку по нажатию на крестик в конце поля ввода. По введённому ключу отображаются все карточки на текущей доске, содержащие в описании хештег с ключом. 
Кнопка "Back to all Pins": появляется вместе с результатами поиска. При нажатии возвращает доску в исходное состояние (до поиска). Выпадающий список: отображает перечень существующих на сервере досок. 
При нажатии на имя доски происходит переход на указанную доску.
- **BOARD:** Расположение карточек на доске: при изменении размеров экрана или добавлении/удалении карточек на доске, автоматическая подстройка отображения сетки доски.
- **СARDS:** При открытии сайта вы можете видеть перед собой сгенерированные карточки, которые содержат картинку, аватар автора и описание картинки. Если описание карточки превышает допустимый размер, часть описания скрывается, скрытая часть заменяется на «…». 
- **FOOTER:** Меню футера: при наведении мышью на элементы меню, появляется подсказка, какие действия выполняются данной ссылкой.
При нажатии на ссылку "Home" происходит переход к началу страницы.
При наведении на ссылку "About" появляется описание проекта.
При нажатии на ссылку "Team" открывается модальное окно с именами участников команды и возможностью перехода на личные профили github.
При нажатии на ссылку "Code" происходит переход к репозиторию github с исходным кодом проекта.
### Модальные окна:
- **Модальное окно для укрупненного вида карточек:** При нажатии на карточку или на описание к карточке в выбранной доске открывается отдельное модальное окно с увеличенной картинкой, полным описанием карточки, а также именем и аватаром автора. Модальное окно закрывается при нажатии на крестик или при нажатии мышкой за пределами модального окна.
- **Модальное окно для добавления :** При наведении карточку появляются кнопка "Add to the board": при нажатии на данную кнопку на определенной карточке появляется модальное окно с перечнем доступных досок, на которые вы можете переместить карточку. При нажатии на одну из досок карточка перемещается на выбранную доску. Затем модальное окно закрывается, происходит перерендеривание карточек на текущей доске. 
- **Модальное окно для жалобы :** При наведении карточку появляются кнопка "Complain": При возникновении жалобы вы можете нажать на кнопку "Complain". При нажатии на данную кнопку на определенной карточке появляется модальное окно с вариантами жалоб. При выборе 1 или нескольких вариантов жалоб вы можете отправить их нажав кнопку «Send». При отправке жалоб модальное окно закрывается, карточка перемещается в архив. Архив представляет собой отдельную доску, не отображаемую на сайте. Форма отправляется в специально созданный телеграм-канал для обработки администратором с информацией о жалобе. Если вы передумали отправлять жалобу на определенную карточку, вы можете нажать кнопку «Cancel».
- **Модальное окно для добавления доски :** В основном меню справа снизу есть кнопка с обозначением "+". При нажатии на которую открывается модальное окно с меню для добавления доски. Если доска существует - вам предложат написать другое название. В случае, если имя не занято - вы получите сообщение об успешной регистрации имени и спустя 3 секунды окно перезагрузится.

### Фичи:
- Если у автора картинки нет аватара, то вместо него вы увидите кружок рандомного цвета с первой буквой автора
- Если вы захотите поработать в плохом освещении предусмотрена темная тема.
## Установка и старт проекта:

```
npm install
npm run server:dev
npm run start
```
