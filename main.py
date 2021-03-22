from website import create_app,db 

app = create_app()

# with app.app_context():
#     db.create_all()
#     print("hello")
# # db.create_all(app)

if __name__ == '__main__':
    app.run(debug = False, port = 5000)