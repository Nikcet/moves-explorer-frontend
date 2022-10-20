from bs4 import BeautifulSoup
import os
import re

# directory_name = 'src\components'
indexed_file = 'AboutMe.jsx'
file_extension = 'css'


def create_path(dir_name):
    if not os.path.isdir(dir_name):
        if file_extension == 'css':
            try:
                os.mkdir(f'{os.getcwd()}\\{dir_name.capitalize()}')
            except:
                print('Такая директория уже есть.')
        # elif file_extension == 'jsx':
        #     os.mkdir(f'{os.getcwd()}\\{dir_name.capitalize()}')
        else:
            print('Нет такого расширения')
            return

        os.chdir(dir_name)
        new_dir = os.getcwd()
        os.chdir('../')
    else:
        os.chdir(dir_name)
        new_dir = os.getcwd()
        os.chdir('../')

    return new_dir


def read_file():
    os.chdir('src\components\AboutMe')
    print(os.getcwd())
    with open(indexed_file) as file:
        content = file.read()
        soup = BeautifulSoup(content, 'lxml')
    return soup


def create_file(new_dir, name, extension):
    with open(f'{new_dir}\\{name}.{extension}', 'w') as file:
        if file_extension == 'css':
            file.write(f'.{name} ' + '{}')
        # elif file_extension == 'jsx':
        #     file.write(
        #         f'export default function {name.capitalize()}() ' + '{};')
        else:
            print('Нет такого расширения')
            return


def main():
    # components_dir = create_path(directory_name)
    elements = read_file().body.find_all()

    if '.jsx' in indexed_file:
        classes = set()
        for el in elements:
            if 'classname' in str(el):
                found = re.findall(r'"(.*?)"', str(el))
                classes.update(set(found))
        # print(classes)

        for el in classes:
            file_name = el
            if '__' not in file_name:
                # os.chdir(components_dir)
                directory = create_path(file_name)
                create_file(directory, file_name, file_extension)
        
        for el in classes:
            file_name = el
            if '__' in file_name:
                if file_extension == 'jsx':
                    continue
                split_name = file_name.split('__')
                os.chdir(split_name[0])
                directory = create_path(f'__{split_name[1]}')
                create_file(directory, file_name, file_extension)
                os.chdir('../')
            else:
                # os.chdir(components_dir)
                directory = create_path(file_name)
                create_file(directory, file_name, file_extension)
    # elif '.html' in indexed_file:
    #     for el in elements:
    #         file_name = el['class'][0]
    #         if '__' in file_name:
    #             if file_extension == 'jsx':
    #                 continue
    #             split_name = file_name.split('__')
    #             os.chdir(split_name[0])
    #             directory = create_path(f'__{split_name[1]}')
    #             create_file(directory, file_name, file_extension)
    #             os.chdir('../')
    #         else:
    #             os.chdir(components_dir)
    #             directory = create_path(file_name)
    #             create_file(directory, file_name, file_extension)


if __name__ == '__main__':
    # print(os.getcwd())
    main()
