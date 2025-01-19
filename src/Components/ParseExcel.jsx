import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Filter } from "./Filter";
import { Table } from "./Table";

export const ParseExcel = ({ fileName, title }) => {
  const [parsedData, setParsedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const loadFile = async () => {
      try {
        const response = await fetch(`/src/Sorce/${fileName}`);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 11 });
        const hierarchy = buildHierarchy(rawData);
        setParsedData(hierarchy);
        setFilteredData(hierarchy); // Изначально фильтр совпадает с данными
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
      }
    };

    loadFile();
  }, [fileName]);

  const level1 = ["ТОВАР"];
  const level2 = ["МРІЯ", "РОШЕН"];
  const level3 = [
    "ДЕСЕРТИ",
    "ДОБАВКИ",
    "ПРИПРАВИ",
    "СПЕЦІЇ",
    "БАТОНИ",
    "БІСКВІТИ",
    "ВАФЛІ ФАСОВАНІ",
    "КАРАМЕЛЬ 200/300",
    "КАРАМЕЛЬ ВАГОВА",
    "КОРОБКИ",
    "ПЕЧИВО ТА КРЕКЕР ФАСОВАНІ",
    "ЦУКЕРКИ ШОКОЛАДНІ ВАГОВІ",
    "ЦУКЕРКИ ШОКОЛАДНІ ФАСОВАНІ",
    "ШОКОЛАД",
  ];

  const buildHierarchy = (data) => {
    const result = [];
    let currentLevel1 = null;
    let currentLevel2 = null;
    let currentLevel3 = null;

    data.forEach((row) => {
      const [level, ...columns] = row;

      if (level1.includes(level)) {
        currentLevel1 = { level, columns, children: [] };
        result.push(currentLevel1);
        currentLevel2 = null;
        currentLevel3 = null;
      } else if (level2.includes(level)) {
        currentLevel2 = { level, columns, children: [] };
        currentLevel1.children.push(currentLevel2);
        currentLevel3 = null;
      } else if (level3.includes(level)) {
        currentLevel3 = { level, columns, children: [] };
        if (currentLevel2) {
          currentLevel2.children.push(currentLevel3);
        } else {
          currentLevel1.children.push(currentLevel3);
        }
      } else {
        const product = { level, columns };
        if (currentLevel3) {
          currentLevel3.children.push(product);
        } else if (currentLevel2) {
          currentLevel2.children.push(product);
        } else {
          currentLevel1.children.push(product);
        }
      }
    });

    return result;
  };

  const handleFilterChange = (selectedFilter) => {
    setKeyword(selectedFilter);
  
    // Объект для сопоставления значений фильтра с отображаемыми значениями
    const filterMap = {
      vip: "ВІП",
      opt: "ОПТ",
      all: "Весь товар"
    };
  
    // Получаем нормализованное значение из объекта filterMap
    const normalizedFilter = filterMap[selectedFilter] || selectedFilter;
  
    if (normalizedFilter === "Весь товар") {
      setFilteredData(parsedData); // если фильтр "all", сбрасываем фильтрацию
    } else {
      const filterHierarchy = (data) => {
        return data
          .map((item) => {
            // Если есть дочерние элементы, фильтруем их рекурсивно
            if (item.children) {
              const filteredChildren = filterHierarchy(item.children);
              // Если у категории есть отфильтрованные дочерние элементы, она сохраняется
              return filteredChildren.length > 0 ? { ...item, children: filteredChildren } : null;
            }
  
            // Фильтрация только по level
            if (item.level && item.level.includes(normalizedFilter)) {
              return item;
            }
  
            return null; // Если не найдено совпадений
          })
          .filter(Boolean); // Убираем null (пустые категории)
      };
  
      // Применяем фильтрацию и сохраняем результат
      setFilteredData(filterHierarchy(parsedData));
    }
  };
  
  

  return (
    <div>
      <h1>{title}</h1>
      <Filter onFilterChange={handleFilterChange} />
      {filteredData.length > 0 ? (
        <Table data={filteredData} />
      ) : (
        <p>Нет данных для отображения</p>
      )}
    </div>
  );
};
