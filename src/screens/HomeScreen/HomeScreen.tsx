import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "styles/colors";
import fonts from "styles/fonts";
import { useEffect, useRef, useState } from "react";
import * as SQLite from "expo-sqlite";
import Header from "./components/Header";

export type MenuItem = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const db = SQLite.openDatabase("little_lemon");

const HomeScreen: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const isInit = useRef(true);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, name text, price int, description text, image text, category text);"
      );
      tx.executeSql(
        `select * from items;`,
        [],
        async (_, { rows: { _array, length } }) => {
          if (length > 0) {
            setMenu(_array);
          } else {
            const menu = await getMenu();
            setMenu(menu);
          }
          isInit.current = false;
        }
      );
    });
  }, []);

  useEffect(() => {
    if (!isInit.current) {
      const timer = setTimeout(() => {
        getFilteredMenu();
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [search]);

  useEffect(() => {
    if (!isInit.current) {
      getFilteredMenu();
    }
  }, [selectedCategories.length]);

  const getFilteredMenu = () => {
    db.transaction((tx) => {
      const searchCategories = selectedCategories.length
        ? selectedCategories
        : categories;
      tx.executeSql(
        `select * from items where name like ? and category in (${searchCategories
          .map((item) => "?")
          .join(",")});`,
        [`%${search}%`, ...searchCategories.map((item) => item)],
        async (_, { rows: { _array, length } }) => {
          setMenu(_array);
        }
      );
    });
  };

  const getMenu = async () => {
    try {
      const result = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const data = await result.json();
      const dataPlaceholder = Array.from(
        data.menu,
        () => "(?, ?, ?, ?, ?)"
      ).join(",");
      db.transaction((tx) => {
        tx.executeSql(
          `insert into items (name, price, description, image, category) values ${dataPlaceholder}`,
          data.menu
            .map((item: MenuItem) => [
              item.name,
              item.price,
              item.description,
              item.image,
              item.category,
            ])
            .reduce((acc, item) => [...acc, ...item], [])
        );
      });
      return data.menu;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [menu]);

  const getCategories = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        `select distinct category from items;`,
        [],
        async (_, { rows: { _array, length } }) => {
          setCategories(_array.map((item) => item.category));
        }
      );
    });
  };

  const handleCategoryPress = (category: string) => () => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearch(() => text);
  };

  const renderItem: ListRenderItem<MenuItem> = ({ item }) => {
    return (
      <View style={styles.menuItem}>
        <View style={styles.container}>
          <Text style={fonts.Leading}>{item.name}</Text>
          <Text style={fonts.Paragraph}>{item.description}</Text>
          <Text style={fonts.Leading}>${item.price}</Text>
        </View>
        <Image
          source={{
            uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
          }}
          style={{ height: 100, width: 100, borderRadius: 8, marginLeft: 16 }}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <>
      <Header
        search={search}
        handleSearchChange={handleSearchChange}
        categories={categories}
        selectedCategories={selectedCategories}
        handleCategoryPress={handleCategoryPress}
      />
      <FlatList
        data={menu}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={{ paddingBottom: bottom }}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: colors.primaryGreen,
    padding: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    ...fonts.Headline,
    fontSize: 48,
    color: colors.primaryYellow,
  },
  subtitle: {
    ...fonts.Headline,
    color: colors.highlightWhite,
    marginBottom: 8,
  },
  description: {
    ...fonts.Paragraph,
    color: colors.highlightWhite,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  menuHeader: {
    ...fonts.Headline,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  categories: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuItem: {
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  separator: {
    height: 1,
    backgroundColor: colors.primaryGreen,
    opacity: 0.3,
    marginVertical: 16,
  },
  search: {
    backgroundColor: "#aaa",
    borderColor: "#aaa",
    marginTop: 16,
  },
});

export default HomeScreen;
