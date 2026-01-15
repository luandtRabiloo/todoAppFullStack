import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../element/Header';
import TodoItemCard from '../../element/TaskItem';
import { Colors } from '../../utils/color';
import { useGetListTask } from './modules/useGetListTask';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../App';

export function Home() {
  const { list } = useGetListTask();
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={{ flex: 1 }}>
      <Header iconLeft={false} title={'TodoApp'} iconRight={true} />
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: Colors.primary,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          data={list}
          renderItem={({ item }) => <TodoItemCard data={item} />}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateTask')}
          style={{
            bottom: 0,
            right: 20,
            position: 'absolute',
            width: 70,
            height: 70,
            borderRadius: 70,
            backgroundColor: Colors.sub_primary,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginBottom: 60,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: Colors.base,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
