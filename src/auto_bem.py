from bs4 import BeautifulSoup
import os
import re

clear = lambda: os.system('cls')


def create_path(dir_name):
    os.chdir(os.path.dirname(__file__))
    print('Создает директорию: ' + dir_name)
    if not os.path.isdir(dir_name):
        os.mkdir(dir_name)
    else:
        print('Директория уже есть')
    return os.path.isdir(dir_name)


def change_dir(dir_name):
    print('Заходит в: ' + dir_name)
    os.chdir(dir_name)
    return os.getcwd()


def read_file(indexed_file):
    with open(f'{os.path.dirname(__file__)}\\{indexed_file}') as file:
        content = file.read()
        soup = BeautifulSoup(content, 'lxml')
    return soup


def create_file(name):
    print('Создает файл: ' + name)
    if not os.path.exists(f'{name}.css'):
        with open(f'{name}.css', 'a') as file:
            file.write(f'.{name} ' + '{}')
    else:
        print('Такой файл уже существует.')


def parse_file(ind_file):
    elements = read_file(ind_file).body.find_all()
    classes = set()
    for el in elements:
        if 'classname' in str(el):
            found = re.findall(r'"(.*?)"', str(el))
            classes.update(set(found))
    return classes


def main(indexed_file):
    for class_name in parse_file(indexed_file):
        if '__' in class_name:
            split_name = class_name.split('__')
            block_name = f'__{split_name[1]}'
            create_path(block_name)
            change_dir(block_name)
            create_file(class_name)
            change_dir('../')
        else:
            create_file(class_name)
    print('Готово!')


if __name__ == '__main__':
    clear()
    current_path = os.path.dirname(__file__)
    print('Удали из целевого файла значения всех атрибутов, кроме className!')
    input('Нажми Enter чтобы продолжить.')
    clear()

    print('Ищет файл с расширением jsx...')
    indexed_file = ''
    for item in os.listdir(current_path):
        if '.jsx' in item:
            indexed_file = item
            print('Нашел ' + indexed_file)
            break

    if indexed_file:
        main(indexed_file)
    else:
        print('Не нашел файл с расширением .jsx в данной директории.\nВыход.')
