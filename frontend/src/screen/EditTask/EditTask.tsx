import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../element/Header';
import { Colors } from '../../utils/color';
import { useState } from 'react';
import { updateTodo } from '../../utils/FetchApi/FetchApi';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '../../utils/FetchApi/Querykey';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

export function EditTask() {
  const route = useRoute<RouteProp<RootStackParamList, 'EditTask'>>();
  const { taskId, title, completed, subTitle } = route.params;
  const [titleE, setTitleE] = useState(title);
  const [subTitleE, setSubTitleE] = useState(subTitle);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const onEditTask = async () => {
    try {
      if (titleE === title) {
        return;
      }
      await updateTodo({
        title: titleE,
        subTitle: subTitleE,
        id: taskId,
        completed,
      });
      queryClient.refetchQueries({ queryKey: [QueryKey.useGetListTask] });
      navigation.goBack();
      setTitleE('');
      setSubTitleE('');
    } catch (error) {
      console.log('onEditTask error', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header iconLeft={true} title={'Edit task'} iconRight={false} />
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: Colors.base,
          gap: 40,
        }}
      >
        <TextInput
          value={titleE}
          onChangeText={e => setTitleE(e)}
          placeholder="Title"
          style={{
            height: 46,
            fontSize: 20,
            borderBottomWidth: 1,
          }}
        />
        <TextInput
          value={subTitleE}
          onChangeText={e => setSubTitleE(e)}
          placeholder="Detail"
          style={{
            height: 46,
            fontSize: 20,
            borderBottomWidth: 1,
          }}
        />
        <TouchableOpacity
          onPress={onEditTask}
          style={{
            backgroundColor: Colors.sub_primary,
            padding: 20,
            borderRadius: 24,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              color: Colors.base,
              fontSize: 20,
            }}
          >
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
