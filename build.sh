# #!/usr/bin/env bash

# set -o errexit  # exit on error

# pip install -r requirements.txt

# python manage.py collectstatic --no-input
# python manage.py migrate
#!/usr/bin/env bash

#!/usr/bin/env bash

set -o errexit  # Exit on error

cd Test_django
pip install -r ../requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
