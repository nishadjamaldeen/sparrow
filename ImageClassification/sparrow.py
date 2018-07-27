import os
import shutil
import sys

from classify import runner

label_file_location = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'retrainedModel/output_label.txt')
graph_file_location = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'retrainedModel/output_graph.pb')

if __name__ == "__main__":

    #new_image_path = os.path.join(os.path.dirnam(os.path.abspath(__file__)))
    NEW_IMAGE_PATH = "./images/"
    
    print("here")
    #retrain_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'toRetrain')

    SUBDIR = os.listdir(NEW_IMAGE_PATH)
    print(len(SUBDIR))

    for file in SUBDIR:
        print(str(file))
        if file.endswith('.JPG') or file.endswith('.jpg'):
            labels, results = runner(os.path.join(NEW_IMAGE_PATH, file))
        else:
            os.remove(os.path.join(NEW_IMAGE_PATH, file))   

    
    
    for i in range(0, len(labels) - 1):
        print(labels[i], results[i])

    print(labels, results)
    sys.stdout.flush()


        