import os
import shutil
import sys
import requests

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

    # for file in SUBDIR:
    #     print(str(file))
    #     if file.endswith('.JPG') or file.endswith('.jpg'):
    #         labels, results = runner(os.path.join(NEW_IMAGE_PATH, file))
    #     else:
    #         os.remove(os.path.join(NEW_IMAGE_PATH, file))   

    labels, results = runner("../images/" + sys.argv[1]);

    
    attributes = ""
    
    for i in range(0, len(labels) - 1):
        if (results[i] > 0.2) and len(attributes) < 2:
            attributes = attributes + str(labels[i])
        elif results[i] > 0.2:
            attributes = attributes + ", " + str[labels[i]]

    req = requests.post('http:127.0.0.1:3000/api/update/items', data = {'img' : sys.argv[1], 'items' : attributes})
    
    


    print(labels, results)
    sys.stdout.flush()


        